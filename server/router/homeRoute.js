const route = require('express').Router()
const HomeController = require('../controllers/homeController')

route.post('/register',HomeController.register)
route.post('/login',HomeController.login)
route.post('/google', HomeController.googleLogin);

module.exports = route