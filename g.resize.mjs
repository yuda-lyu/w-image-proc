import _ from 'lodash-es'
import w from 'wsemi'
import wi from './src/WImage.mjs'


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


//node g.resize.mjs
