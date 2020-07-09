

const route = require('express').Router()
const homeRoute = require('./homeRoute')
const footballRoute = require('./footballRoute')
const newsRoute = require('./newsRoute')


route.use('/', homeRoute)
route.use('/football',footballRoute)
route.use('/news', newsRoute)

module.exports = route