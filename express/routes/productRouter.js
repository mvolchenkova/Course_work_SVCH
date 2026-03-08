const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);

module.exports = router