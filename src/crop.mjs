import proc from './proc.mjs'


/**
 * 圖片裁切
 *
 * @param {String} fpInp 輸入來源圖片位置字串
 * @param {Integer} left 輸入裁切左邊座標整數，單位px
 * @param {Integer} top 輸入裁切上邊座標整數，單位px
 * @param {Integer} width 輸入裁切圖寬整數，單位px
 * @param {Integer} height 輸入裁切圖高整數，單位px
 * @param {String} fpOut 輸入目標圖片位置字串
 * @param {Object} [opt={}] 輸入設定物件，含各種類編碼設定，預設{}
 * @return {Promise} 回傳Promise，resolve回傳成功訊息，reject回傳錯誤訊息
 * @example
 *
 * import _ from 'lodash-es'
 * import w from 'wsemi'
 * import wi from './src/WImageProc.mjs'
 *
 * let test = async () => {
 *
 *     let pre = ''
 *     let key = 'crop'
 *
 *     let ts = []
 *     _.each(['png', 'svg'], (extIn) => {
 *         _.each([
 *             {
 *                 ext: 'jpg',
 *             },
 *             {
 *                 ext: 'webp',
 *             },
 *             {
 *                 ext: 'png',
 *                 opt: {
 *                     compressionLevely: 5,
 *                 },
 *             },
 *         ], (o) => {
 *             ts.push({
 *                 in: {
 *                     ext: extIn,
 *                 },
 *                 out: {
 *                     ...o,
 *                 },
 *             })
 *         })
 *     })
 *
 *     await w.pmSeries(ts, async (t) => {
 *         // console.log('t', t)
 *         let fpIn = `./test/cocktail.${t.in.ext}`
 *         let fpOut = `./test/cocktail_${pre}_${key}[${t.in.ext}_to_${t.out.ext}].${t.out.ext}`
 *         let opt = {
 *             ..._.get(t, 'out.opt', {}),
 *         }
 *         let left = 100
 *         let top = 100
 *         let width = 400
 *         let height = 400
 *         let r = await wi.crop(fpIn, left, top, width, height, fpOut, opt)
 *         console.log(t, r)
 *     })
 *
 * }
 * await test()
 *     .catch((err) => {
 *         console.log(err)
 *     })
 *
 */
let crop = async (fpInp, left, top, width, height, fpOut, opt = {}) => {
    let optExt = {
        ...opt,
        cropLeft: left,
        cropTop: top,
        cropWidth: width,
        cropHeight: height,
        funGetWidth: null, //移除
        funGetHeight: null, //移除
        funGetSize: null, //移除
        returnBase64: false,
    }
    let r = await proc(fpInp, fpOut, optExt)
    return r
}


export default crop
