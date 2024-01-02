const router = require('express').Router();
const authGuard = require('../Middleware/authGuard.js')
const { getcurrentUser } = require('../controllers/userController')


const serviceControllerUser = require('../controllers/userController.js')
const serviceControllerProducts = require('../controllers/productsController.js')

router.route('/register').post((req, res) => serviceControllerUser.register(req, res))

router.route('/login').post((req, res) => serviceControllerUser.login(req, res))

router.route('/all/users').get((req, res) => serviceControllerUser.getAll(req, res))

router.route('/profile').get(authGuard, getcurrentUser, (req, res) => serviceControllerUser.getAll(req, res))
router.route('/users/update/:userId').put((req, res) => serviceControllerUser.updateUser(req, res))



//Podutos 

router.route('/create/products').post((req, res) => serviceControllerProducts.registerProducts(req, res))
router.route('/get/products').get((req, res) => serviceControllerProducts.getAllProducts(req, res))
router.route('/remove/products/:productsId').delete((req, res) => serviceControllerProducts.removeProduct(req, res))
router.route('/update/products/:productsId').put((req, res) => serviceControllerProducts.updateProducts(req, res))

module.exports = router
