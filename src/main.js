const env = require('node-env-file')
const { Kayn } = require('kayn')
const myConfig = require('./configs/kaynConfig')

// Initialize
env(__dirname + '/.env')
const kayn = Kayn(process.env.KEY)(myConfig)

requestSummoner = (name) =>{
    kayn.Summoner.by.name(name)
    .then(summoner => {
        console.log(summoner)
    })
    .catch(error => console.error(error))
}

requestSummoner('yassuo')




