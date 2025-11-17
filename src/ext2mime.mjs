import toLower from 'lodash-es/toLower.js'


let ext2mime = (ext) => {
    ext = toLower(ext)
    if (ext === 'png') return 'image/png'
    if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
    if (ext === 'gif') return 'image/gif'
    if (ext === 'svg') return 'image/svg+xml'
    if (ext === 'webp') return 'image/webp'
    return 'application/octet-stream'
}


export default ext2mime
