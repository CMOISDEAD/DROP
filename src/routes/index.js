const path = require('path')
const express = require('express')
const router = express.Router()
const { Kayn } = require('kayn')
const myConfig = require('../configs/kaynConfig')
const env = require('node-env-file')

// Initialization
env(path.join(__dirname, '../.env'))
const kayn = Kayn(process.env.KEY)(myConfig)

// Global variables
const listaCampeones = []

requestSummoner = (data) => {
    return kayn.Summoner.by.name(data)
        .then(res => res)
        .catch(error => {
            return 'null'
            console.error(error)
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

requestChamps()

router.get("/", (req, res) => {
    res.render("pages/home");
});

router.get('/champs', async (req, res) => {    
    const alterna = {
        name : listaCampeones
    }
    res.render('pages/champs', alterna)
})

router.get('/champs/:name', (req, res)=>{
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