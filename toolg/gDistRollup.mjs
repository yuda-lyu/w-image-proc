import rollupFiles from 'w-package-tools/src/rollupFiles.mjs'
import getFiles from 'w-package-tools/src/getFiles.mjs'


let fdSrc = './src'
let fdTar = './dist'


rollupFiles({
    fns: 'WImageProc.mjs',
    fdSrc,
    fdTar,
    hookNameDist: () => 'w-md2html',
    // nameDistType: 'kebabCase', //直接由hookNameDist給予
    globals: {
        'path': 'path',
        'fs': 'fs',
        'sharp': 'sharp',
    },
    external: [
        'path',
        'fs',
        'sharp',
    ],
})

