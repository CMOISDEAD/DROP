const path = require('path')
const express = require('express')
const router = express.Router()
const { Kayn } = require('kayn')
const myConfig = require('../configs/kaynConfig')
const env = require('node-env-file')

// Initialization
env(path.join(__dirname, '../.env'))
const kayn = Kayn(process.env.KEY)(myConfig)

requestSummoner = (data) => {
    return kayn.Summoner.by.name(data)
        .then(res => res)
        .catch(error => console.error(error))
}

requestChamps = (data) => {
    return kayn.DDragon.Champion.list(data)
        .then(res => {
            var champions = res.data
            return champions
        })
        .catch(err => console.error(err))
}

router.get("/", (req, res) => {
    res.render("pages/home");
});

router.get('/champs', async (req, res) => {
    var champions = await requestChamps('11.1.1')

    // champions.forEach(name => {
    //     console.log(name.id)
    // });

    res.render('pages/champs', champions)
})

router.get('/summoner', (req, res) => {
    res.render('pages/summonerSearch')
})

router.get('/about', (req, res) => {
    res.send('about')
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