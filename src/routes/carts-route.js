const express = require('express');
const cartController = require('../controllers/cart-controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, cartController.getCart);
router.post('/', auth, cartController.addToCart);
router.put('/', auth, cartController.updateCartItem);
router.delete('/item', auth, cartController.removeFromCart);
router.delete('/', auth, cartController.clearCart);

module.exports = router;
