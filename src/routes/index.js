const express = require('express')
const router = express.Router()

const cmo = require('../main')

router.get("/", (req, res) => {
    res.render("pages/home");
});

router.get('/champs', (req, res) =>{
    res.send('Champs')
})

router.get('/summoner', (req, res) =>{
    res.render('pages/summonerSearch')
})

router.get('/about', (req, res) =>{
    res.send('about')
})

router.get('/summoner/search', (req, res)=>{
    let {summonerName} = req.query 
    console.log(summonerName)
    person = {
        name : summonerName
    }
    
    res.render('pages/summoner', person)
})

module.exports = router