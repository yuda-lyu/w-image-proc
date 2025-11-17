import fs from 'fs'
import get from 'lodash-es/get.js'
import toLower from 'lodash-es/toLower.js'
import cloneDeep from 'lodash-es/cloneDeep.js'
import isnum from 'wsemi/src/isnum.mjs'
import isfun from 'wsemi/src/isfun.mjs'
import isbol from 'wsemi/src/isbol.mjs'
import ispm from 'wsemi/src/ispm.mjs'
import cint from 'wsemi/src/cint.mjs'
import haskey from 'wsemi/src/haskey.mjs'
import getFileNameExt from 'wsemi/src/getFileNameExt.mjs'
import fsIsFile from 'wsemi/src/fsIsFile.mjs'
import sharp from 'sharp'
import buf2b64 from './buf2b64.mjs'


/**
 * 圖片處理
 *
 * @param {String} fpInp 輸入來源圖片位置字串
 * @param {String} fpOut 輸入目標圖片位置字串
 * @param {Object} [opt={}] 輸入設定物件，含各種類編碼設定，預設{}
 * @param {Function} [opt.funGetWidth=null] 輸入指定圖片寬度函數，函數輸入會提供圖片metadata物件，預設null
 * @param {Function} [opt.funGetHeight=null] 輸入指定圖片高度函數，函數輸入會提供圖片metadata物件，預設null
 * @param {Function} [opt.funGetSize=null] 輸入指定圖片寬高度函數，函數輸入會提供圖片metadata物件，預設null
 * @param {Integer} [opt.cropLeft=null] 輸入裁切左邊座標整數，單位px，預設null
 * @param {Integer} [opt.cropTop=null] 輸入裁切上邊座標整數，單位px，預設null
 * @param {Integer} [opt.cropWidth=null] 輸入裁切圖寬整數，單位px，預設null
 * @param {Integer} [opt.cropHeight=null] 輸入裁切圖高整數，單位px，預設null
 * @param {Integer} [opt.density=96] 輸入DPI整數，主要用於向量圖轉點陣圖，預設96
 * @param {Boolean} [opt.returnBase64=false] 輸入是否回傳Base64字串布林值，預設false
 * @return {Promise} 回傳Promise，resolve當returnBase64=false時回傳成功訊息，當returnBase64=true時回傳Base64字串，reject回傳錯誤訊息
 * @example
 *
 * 詳見convert、resize、crop、base64範例
 *
 */
let proc = async (fpInp, fpOut, opt = {}) => {
    //注意sharp不能使用toFile須改使用fs讀寫buf, 否則會容易鎖死檔案

    //check
    if (!fsIsFile(fpInp)) {
        throw new Error(`fpInp[${fpInp}] does not exist`)
    }

    //funGetWidth, funGetHeight, funGetSize
    let funGetWidth = get(opt, 'funGetWidth')
    let funGetHeight = get(opt, 'funGetHeight')
    let funGetSize = get(opt, 'funGetSize')

    //cropLeft, cropTop, cropWidth, cropHeight
    let cropLeft = get(opt, 'cropLeft')
    let cropTop = get(opt, 'cropTop')
    let cropWidth = get(opt, 'cropWidth')
    let cropHeight = get(opt, 'cropHeight')

    //density
    let density = get(opt, 'density')
    if (!isnum(density)) {
        density = 96 //96dpi與瀏覽器比例一致
    }
    density = cint(density)

    //returnBase64
    let returnBase64 = get(opt, 'returnBase64')
    if (!isbol(returnBase64)) {
        returnBase64 = false
    }

    //extOut
    let extOut = getFileNameExt(fpOut)
    extOut = toLower(extOut)
    // console.log('extOut', extOut)

    //bufIn
    let bufIn = fs.readFileSync(fpInp)

    //width, height
    let width = null
    let height = null
    if (isfun(funGetSize) || isfun(funGetWidth) || isfun(funGetHeight)) {

        //meta
        let meta = await sharp(bufIn).metadata() //metadata()讀取後內部stream會被消耗, 不能再用於resize

        if (isfun(funGetSize)) {

            //funGetSize
            let s = funGetSize(cloneDeep(meta))
            if (ispm(s)) {
                s = await s
            }

            //check
            if (!isnum(get(s, 'width'))) {
                throw new Error(`invalid ret.width for funGetSize`)
            }
            if (!isnum(get(s, 'height'))) {
                throw new Error(`invalid ret.height for funGetSize`)
            }
            width = cint(s.width)
            height = cint(s.height)

        }
        else if (isfun(funGetWidth)) {

            //funGetWidth
            width = funGetWidth(cloneDeep(meta))
            if (ispm(width)) {
                width = await width
            }
            width = cint(width)

        }
        else if (isfun(funGetHeight)) {

            //funGetHeight
            height = funGetHeight(cloneDeep(meta))
            if (ispm(height)) {
                height = await height
            }
            height = cint(height)

        }
    }

    //img
    let img = await sharp(bufIn, { density })
    let bProcWidth = isnum(width)
    let bProcHeight = isnum(height)
    let bProcCrop = isnum(cropLeft) && isnum(cropTop) && isnum(cropWidth) && isnum(cropHeight)
    if (bProcWidth && bProcHeight) {

        //resize
        img = img.resize({
            width,
            height,
            withoutEnlargement: true, //拒絕放大圖片
        })

    }
    else if (bProcWidth && !bProcHeight) {

        //resize
        img = img.resize({
            width, //等比例縮放
            withoutEnlargement: true, //拒絕放大圖片
        })

    }
    else if (!bProcWidth && bProcHeight) {

        //resize
        img = img.resize({
            height, //等比例縮放
            withoutEnlargement: true, //拒絕放大圖片
        })

    }
    if (bProcCrop) {

        //cint
        cropLeft = cint(cropLeft)
        cropTop = cint(cropTop)
        cropWidth = cint(cropWidth)
        cropHeight = cint(cropHeight)

        //extract
        img = img.extract({
            left: cropLeft,
            top: cropTop,
            width: cropWidth,
            height: cropHeight,
        })

    }

    //kpFormat
    let kpFormat = {
        png: () => img.png({
            compressionLevel: 9, // 範圍 0–9
            adaptiveFiltering: false,
            palette: false, // 是否使用 palette（會變成8-bit）
            quality: 100, // palette=true 才有用
            colors: 256, // palette=true 才有用
            ...opt,
        }),
        jpg: () => img.flatten({ background: get(opt, 'background', '#fff') }).jpeg({
            quality: 100, // 1–100
            progressive: false,
            chromaSubsampling: '4:2:0',
            optimiseCoding: true, // 有助於壓縮
            mozjpeg: false,
            overshootDeringing: false,
            ...opt,
        }),
        jpeg: () => img.flatten({ background: get(opt, 'background', '#fff') }).jpeg({
            quality: 100, // 1–100
            progressive: false,
            chromaSubsampling: '4:2:0',
            optimiseCoding: true, // 有助於壓縮
            mozjpeg: false,
            overshootDeringing: false,
            ...opt,
        }),
        webp: () => img.webp({
            quality: 100,
            alphaQuality: 100, // 透明通道品質
            lossless: true, // 無損支援透明
            ...opt,
        }),
        avif: () => img.avif({
            quality: 50, // 1–100
            lossless: false,
            speed: 5, // 0–9 (0 最慢最好)
            chromaSubsampling: '4:2:0',
            ...opt,
        }),
        gif: () => img.gif({
            effort: 7, // 1–10 (壓縮努力程度)
            interlace: false,
            ...opt,
        }),
        tiff: () => img.tiff({
            quality: 100,
            compression: 'jpeg', // 預設是 JPEG 壓縮的 TIFF
            predictor: 'horizontal',
            pyramid: false,
            tile: false,
            ...opt,
        }),
        bmp: () => img.bmp({
            ...opt,
        }),
    }

    //toFormat
    if (haskey(kpFormat, extOut)) {
        img = kpFormat[extOut]()
    }
    else {
        img = img.toFormat(extOut)
    }

    //bufOut
    let bufOut = await img.toBuffer()

    //returnBase64
    if (returnBase64) {

        //pb64
        let pb64 = buf2b64(bufOut, extOut)
        // console.log('b64', b64)

        return pb64
    }

    //writeFileSync
    fs.writeFileSync(fpOut, bufOut)

    return 'ok'
}


export default proc
