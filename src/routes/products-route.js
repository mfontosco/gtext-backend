const express = require('express');
const productController = require('../controllers/products-controller');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', auth, role('admin'), productController.createProduct);
router.put('/:id', auth, role('admin'), productController.updateProduct);
router.delete('/:id', auth, role('admin'), productController.deleteProduct);

module.exports = router;
