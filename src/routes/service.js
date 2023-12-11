const router = require('express').Router();

const serviceControllerUser = require('../controllers/userController.js')

router.route('/register').post((req, res) => serviceControllerUser.register(req, res))

router.route('/login').post((req, res) => serviceControllerUser.login(req, res))


module.exports = router
