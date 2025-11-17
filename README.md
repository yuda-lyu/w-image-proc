# w-image-proc
A tool for image.

![language](https://img.shields.io/badge/language-JavaScript-orange.svg) 
[![npm version](http://img.shields.io/npm/v/w-image-proc.svg?style=flat)](https://npmjs.org/package/w-image-proc) 
[![license](https://img.shields.io/npm/l/w-image-proc.svg?style=flat)](https://npmjs.org/package/w-image-proc) 
[![npm download](https://img.shields.io/npm/dt/w-image-proc.svg)](https://npmjs.org/package/w-image-proc) 
[![npm download](https://img.shields.io/npm/dm/w-image-proc.svg)](https://npmjs.org/package/w-image-proc) 
[![jsdelivr download](https://img.shields.io/jsdelivr/npm/hm/w-image-proc.svg)](https://www.jsdelivr.com/package/npm/w-image-proc)

## Documentation
To view documentation or get support, visit [docs](https://yuda-lyu.github.io/w-image-proc/global.html).

## Installation

### Using npm(ES6 module):
```alias
npm i w-image-proc
```

#### Example for convert:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-image-proc/blob/master/g.convert.mjs)]
```alias
import _ from 'lodash-es'
import w from 'wsemi'
import wi from './src/WImageProc.mjs'

let test = async () => {

    let pre = ''
    let key = 'convert'

    let ts = []
    _.each(['png', 'svg'], (extIn) => {
        _.each([
            {
                ext: 'jpg',
            },
            {
                ext: 'webp',
            },
            {
                ext: 'png',
                opt: {
                    compressionLevely: 5,
                },
            },
        ], (o) => {
            ts.push({
                in: {
                    ext: extIn,
                },
                out: {
                    ...o,
                },
            })
        })
    })

    await w.pmSeries(ts, async (t) => {
        // console.log('t', t)
        let fpIn = `./test/cocktail.${t.in.ext}`
        let fpOut = `./test/cocktail_${pre}_${key}[${t.in.ext}_to_${t.out.ext}].${t.out.ext}`
        let opt = {
            ..._.get(t, 'out.opt', {}),
        }
        let r = await wi.convert(fpIn, fpOut, opt)
        console.log(t, r)
    })

}
await test()
    .catch((err) => {
        console.log(err)
    })
```

#### Example for resize:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-image-proc/blob/master/g.resize.mjs)]
```alias
import _ from 'lodash-es'
import w from 'wsemi'
import wi from './src/WImageProc.mjs'

let test = async () => {

    let pre = ''
    let key = 'resize'

    let ts = []
    _.each(['png', 'svg'], (extIn) => {
        _.each([
            {
                ext: 'jpg',
            },
            {
                ext: 'webp',
            },
            {
                ext: 'png',
                opt: {
                    compressionLevely: 5,
                },
            },
        ], (o) => {
            ts.push({
                in: {
                    ext: extIn,
                },
                out: {
                    ...o,
                },
            })
        })
    })

    await w.pmSeries(ts, async (t) => {
        // console.log('t', t)
        let fpIn = `./test/cocktail.${t.in.ext}`
        let fpOut = `./test/cocktail_${pre}_${key}[${t.in.ext}_to_${t.out.ext}].${t.out.ext}`
        let opt = {
            ..._.get(t, 'out.opt', {}),
            funGetWidth: (mt) => {
                // console.log('mt', mt)
                return mt.width / 2
            }
        }
        let r = await wi.resize(fpIn, fpOut, opt)
        console.log(t, r)
    })

}
await test()
    .catch((err) => {
        console.log(err)
    })
```

#### Example for crop:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-image-proc/blob/master/g.crop.mjs)]
```alias
import _ from 'lodash-es'
import w from 'wsemi'
import wi from './src/WImageProc.mjs'

let test = async () => {

    let pre = ''
    let key = 'crop'

    let ts = []
    _.each(['png', 'svg'], (extIn) => {
        _.each([
            {
                ext: 'jpg',
            },
            {
                ext: 'webp',
            },
            {
                ext: 'png',
                opt: {
                    compressionLevely: 5,
                },
            },
        ], (o) => {
            ts.push({
                in: {
                    ext: extIn,
                },
                out: {
                    ...o,
                },
            })
        })
    })

    await w.pmSeries(ts, async (t) => {
        // console.log('t', t)
        let fpIn = `./test/cocktail.${t.in.ext}`
        let fpOut = `./test/cocktail_${pre}_${key}[${t.in.ext}_to_${t.out.ext}].${t.out.ext}`
        let opt = {
            ..._.get(t, 'out.opt', {}),
        }
        let left = 100
        let top = 100
        let width = 400
        let height = 400
        let r = await wi.crop(fpIn, left, top, width, height, fpOut, opt)
        console.log(t, r)
    })

}
await test()
    .catch((err) => {
        console.log(err)
    })
```

#### Example for base64:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-image-proc/blob/master/g.base64.mjs)]
```alias
import fs from 'fs'
import _ from 'lodash-es'
import w from 'wsemi'
import wi from './src/WImageProc.mjs'

let test = async () => {

    let pre = ''
    let key = 'base64'

    let ts = []
    _.each(['png', 'svg'], (extIn) => {
        _.each([
            {
                ext: 'jpg',
            },
            {
                ext: 'webp',
            },
            {
                ext: 'png',
                opt: {
                    compressionLevely: 5,
                },
            },
        ], (o) => {
            ts.push({
                in: {
                    ext: extIn,
                },
                out: {
                    ...o,
                },
            })
        })
    })

    await w.pmSeries(ts, async (t) => {
        // console.log('t', t)
        let fpIn = `./test/cocktail.${t.in.ext}`
        let fpOut = `./test/cocktail_${pre}_${key}[${t.in.ext}_to_${t.out.ext}].base64` //html
        let ext = t.out.ext
        let opt = {
            ..._.get(t, 'out.opt', {}),
        }
        let b64 = await wi.base64(fpIn, ext, opt)
        // b64 = `
        //     <img src="${b64}">
        // `
        fs.writeFileSync(fpOut, b64, 'utf8')
        console.log(t.in.ext, t.out.ext, 'ok')
    })

}
await test()
    .catch((err) => {
        console.log(err)
    })
```
