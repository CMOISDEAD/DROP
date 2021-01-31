const path = require('path')
const express = require('express')
const router = express.Router()
const { Kayn } = require('kayn')
const LeagueAPIInit = require('leagueapiwrapper')
const myConfig = require('../configs/kaynConfig')
const env = require('node-env-file')

// Initialization
env(path.join(__dirname, '../.env'))
const kayn = Kayn(process.env.KEY)(myConfig)
const LeagueAPI = new LeagueAPIInit(process.env.KEY, Region.NA)

// Global variables
const versionLive = '11.2.1'

var listaCampeones = []
var listaCampeonesRotacion = []
var listDataByIdWithParentAsId;
var listaCampeonesRotacionNombres = []

let personalChampStats = []
let personalChampData = []


// Functions
requestSummoner = (data) => {
    return kayn.Summoner.by.name(data)
        .then(res => res)
        .catch(error => {
            return 'null'
        })
}

requestChamps = () => {
    kayn.DDragon.Champion.list()
        .version(versionLive)
        .then(res => {
            const champions = res.data
            for (const champs in champions) {
                if (champions.hasOwnProperty.call(champions, champs)) {
                    listaCampeones.push(champs)
                }
            }
        })
        .catch(err => console.error(err))
}

rotationChamps = () => {
    LeagueAPI.getFreeChampionRotation()
        .then(res => {
            listaCampeonesRotacion = res.freeChampionIds
        })
        .catch(console.error);
}

dev = () => {
    kayn.DDragon.Champion.listDataByIdWithParentAsId()
        .then(res => {
            listDataByIdWithParentAsId = res.data            
            for (const id in listaCampeonesRotacion) {
                var indicador = listaCampeonesRotacion[id]
                listaCampeonesRotacionNombres.push(listDataByIdWithParentAsId[indicador].key)
            }
        })
        .catch(err => console.error(err))
}

championStats = (name) => {
    kayn.DDragon.Champion.list()
        .version(versionLive)
        .then(res => {
            personalChampStats.push(res.data[name].stats)
        })
        .catch(err => console.error(err))
}

championInfo = (name) => {
    kayn.DDragon.Champion.list()
        .version(versionLive)
        .then(res => {
            personalChampData.push(res.data[name].title)
            personalChampData.push(res.data[name].blurb)
            personalChampData.push(res.data[name].tags[0])
        })
        .catch(err => console.error(err))
}

requestChamps()
rotationChamps()
dev()

// Routes
router.get("/", (req, res) => {
    res.render("pages/home");
});

router.get('/champs', async (req, res) => {
    const alterna = {
        name: listaCampeones,
        rotacion: listaCampeonesRotacionNombres
    }
    res.render('pages/champs', alterna)
})

router.get('/champs/:name', async (req, res) => {
    const { name } = req.params
    /*
        posicion uno : title
        posicion dos : blurb,
        posicion tres : tags,
        
    */
    championStats(name)
    championInfo(name)
    const championToSend = {
        name,
        title: personalChampData[0],
        blurb: personalChampData[1],
        tag: personalChampData[2],
        stats: personalChampStats[0]
    }
    res.render('pages/champInfo', championToSend)

    personalChampData = []
    personalChampStats = []
})

router.get('/summoner', (req, res) => {
    res.render('pages/summonerSearch')
})

router.get('/about', (req, res) => {
    res.send('about')
})

router.get('/dev', (req, res) => {
    res.send('dev')
})

router.get('/summoner/search', async (req, res) => {
    let { summonerName } = req.query
    var { id, summonerLevel, profileIconId, name } = await requestSummoner(summonerName)
    person = {
        id,
        name,
        profileIconId,
        summonerLevel
    }
    res.render('pages/summoner', person)
})

module.exports = router