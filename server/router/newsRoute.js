const route = require('express').Router()
const newsController = require('../controllers/newsController')
const authentication = require('../middleware/authentication')

route.use(authentication)

route.get('/premierleague', newsController.list)

module.exports = route