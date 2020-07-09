const route = require('express').Router()
const homeRoute = require('./homeRoute')
const footballRoute = require('./footballRoute')

route.use('/',homeRoute)
route.use('/football-video',footballRoute)

module.exports = route