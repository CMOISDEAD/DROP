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
var listaCampeones = []
var listaCampeonesRotacion = []
var listDataByIdWithParentAsId;

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
        .version('11.1.1')
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
        })
        .catch(err => console.error(err))
}

dev()
requestChamps()
rotationChamps()

// Routes
router.get("/", (req, res) => {
    res.render("pages/home");
});

router.get('/champs', async (req, res) => {
    const alterna = {
        name: listaCampeones,
        rotacion: listaCampeonesRotacion
    }
    res.render('pages/champs', alterna)
})

router.get('/champs/:name', (req, res) => {
    const { name } = req.params
    const championToSend = {
        name
    }
    res.render('pages/champInfo', championToSend)
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