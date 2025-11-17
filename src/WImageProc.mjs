import proc from './proc.mjs'
import convert from './convert.mjs'
import resize from './resize.mjs'
import crop from './crop.mjs'
import base64 from './base64.mjs'


/**
 * 圖片處理
 *
 * @return {Object} 回傳物件，其內可呼叫convert、resize、crop、base64之async函數
 * @example
 *
 * 詳見convert、resize、crop、base64範例
 *
 */
let WImageProc = {
    proc,
    convert,
    resize,
    crop,
    base64,
}


export default WImageProc
