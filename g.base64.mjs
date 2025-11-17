import fs from 'fs'
import _ from 'lodash-es'
import w from 'wsemi'
import wi from './src/WImage.mjs'


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


//node g.base64.mjs
