const route = require('express').Router()
const homeRoute = require('./homeRoute')
const footballRoute = require('./footballRoute')
const newsRoute = require('./newsRoute')
const matchDataRoute = require('./matchDataRoute')
const { Router } = require('express')

route.use('/',homeRoute)
route.use('/football-video',footballRoute)
route.use('/news', newsRoute)
route.use('/matchdata', matchDataRoute)

module.exports = route