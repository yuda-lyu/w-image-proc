import fs from 'fs'
import _ from 'lodash-es'
import w from 'wsemi'
import assert from 'assert'
import wi from '../src/WImageProc.mjs'


describe('base64', function() {

    let test = async () => {

        let hashs = []
        let hashsTrue = []

        let pre = 'test'
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
            let fpOutTrue = `./test/cocktail_true_${key}[${t.in.ext}_to_${t.out.ext}].base64`
            let opt = {
                ..._.get(t, 'out.opt', {}),
            }
            let b64 = await wi.base64(fpIn, t.out.ext, opt)
            // console.log(t, r)

            hashs.push(b64)
            hashsTrue.push(fs.readFileSync(fpOutTrue, 'utf8'))

        })

        return {
            hashs,
            hashsTrue,
        }
    }
    // await test()
    //     .catch((err) => {
    //         console.log(err)
    //     })

    it('base64', async function() {
        let m = await test()
        let r = m.hashs
        let rr = m.hashsTrue
        assert.strict.deepEqual(r, rr)
    })

})
