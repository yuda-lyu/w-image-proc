import proc from './proc.mjs'


/**
 * 圖片轉換
 *
 * @param {String} fpInp 輸入來源圖片位置字串
 * @param {String} fpOut 輸入目標圖片位置字串
 * @param {Object} [opt={}] 輸入設定物件，含各種類編碼設定，預設{}
 * @return {Promise} 回傳Promise，resolve回傳成功訊息，reject回傳錯誤訊息
 * @example
 *
 * import _ from 'lodash-es'
 * import w from 'wsemi'
 * import wi from './src/WImage.mjs'
 *
 * let test = async () => {
 *
 *     let pre = ''
 *     let key = 'convert'
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
 *         let r = await wi.convert(fpIn, fpOut, opt)
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
let convert = async(fpInp, fpOut, opt = {}) => {
    let optExt = {
        ...opt,
        cropLeft: null, //移除
        cropTop: null, //移除
        cropWidth: null, //移除
        cropHeight: null, //移除
        funGetWidth: null, //移除
        funGetHeight: null, //移除
        funGetSize: null, //移除
        returnBase64: false,
    }
    let r = await proc(fpInp, fpOut, optExt)
    return r
}


export default convert
