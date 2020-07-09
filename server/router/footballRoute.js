const route = require('express').Router()
const FootballController = require('../controllers/footballController')
const authentication = require('../middleware/authentication')

route.use(authentication)

route.get('/premierleague',FootballController.list)

module.exports = route