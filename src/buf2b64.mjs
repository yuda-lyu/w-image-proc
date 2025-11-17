
import ext2mime from './ext2mime.mjs'


let buf2b64 = (buf, ext) => {

    //b64
    let b64 = buf.toString('base64')

    //mime
    let mime = ext2mime(ext)

    //pb64
    let pb64 = `data:${mime};base64,${b64}`
    // console.log(fp, 'b64', b64)

    return pb64
}


export default buf2b64
