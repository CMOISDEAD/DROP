const env = require('node-env-file')
const express = require('express')
const { Kayn, REGIONS } = require('kayn')
const myConfig = require('./configs/kaynConfig')

// Initialize
const kayn = Kayn(process.env.KEY)(myConfig)
env(__dirname + '/.env')


requestSummoner = (name) =>{
    kayn.Summoner.by.name(name)
    .then(summoner => console.log(summoner))
    .catch(error => console.error(error))
}

module.exports  = requestSummoner


