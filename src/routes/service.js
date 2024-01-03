const router = require('express').Router();
const authGuard = require('../Middleware/authGuard.js')
const { getcurrentUser } = require('../controllers/userController');


const serviceControllerUser = require('../controllers/userController.js')
const serviceControllerProducts = require('../controllers/productsController.js')
const serviceControllerCategory = require('../controllers/categoryController.js')

router.route('/register').post((req, res) => serviceControllerUser.register(req, res))
router.route('/login').post((req, res) => serviceControllerUser.login(req, res))
router.route('/all/users').get((req, res) => serviceControllerUser.getAll(req, res))
router.route('/profile').get(authGuard, getcurrentUser, (req, res) => serviceControllerUser.getAll(req, res))
router.route('/users/update/:userId').put((req, res) => serviceControllerUser.updateUser(req, res))
router.route('/user/delete/:userId').delete((req, res) => serviceControllerUser.deleteUsers(req, res))


//Podutos 

router.route('/create/products').post((req, res) => serviceControllerProducts.registerProducts(req, res))
router.route('/get/products').get((req, res) => serviceControllerProducts.getAllProducts(req, res))
router.route('/remove/products/:productsId').delete((req, res) => serviceControllerProducts.removeProduct(req, res))
router.route('/update/products/:productsId').put((req, res) => serviceControllerProducts.updateProducts(req, res))


// Categorias 
router.route('/create/category').post((req, res) => serviceControllerCategory.createCategory(req, res))
router.route('/get/category').get((req, res) => serviceControllerCategory.getAllCategory(req, res))
router.route('/put/category/:categoryId').put((req, res) => serviceControllerCategory.updateCategory(req, res))
router.route('/delete/category/:categoryId').delete((req, res) => serviceControllerCategory.deleteCategory(req, res))


module.exports = router
