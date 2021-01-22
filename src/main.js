const env = require('node-env-file')
const { Kayn, REGIONS } = require('kayn')
const myConfig = require('./configs/kaynConfig')
const fs = require('fs')
// Initialize
env(__dirname + '/.env')
const kayn = Kayn(process.env.KEY)(myConfig)


kayn.DDragon.Champion.list()
    .version('11.1.1')
    .then(res => {
        const champions = res.data
        const listaCampeones = []
        for (const champs in champions) {
            if (champions.hasOwnProperty.call(champions, champs)) {
                listaCampeones.push(champs)
            }
        }
    })
    .catch(err => console.error(err))
