const route = require('express').Router()
const matchDataController = require('../controllers/matchDataController')
const authentication = require('../middleware/authentication')

//route.use(authentication)

route.get('/standings', matchDataController.standing)

module.exports = route