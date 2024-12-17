const cartService = require('../services/cart-service');

exports.getCart = async (req, res) => {
   try {
      const cart = await cartService.getCart(req.user.id);
      res.json(cart);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

exports.addToCart = async (req, res) => {
   try {
      const { productId, quantity } = req.body;
      const cart = await cartService.addToCart(
         req.user.id,
         productId,
         quantity
      );
      res.status(201).json(cart);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

exports.updateCartItem = async (req, res) => {
   try {
      const { productId, quantity } = req.body;
      const cart = await cartService.updateCartItem(
         req.user.id,
         productId,
         quantity
      );
      res.json(cart);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

exports.removeFromCart = async (req, res) => {
   try {
      const { productId } = req.body;
      const cart = await cartService.removeFromCart(req.user.id, productId);
      res.json(cart);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

exports.clearCart = async (req, res) => {
   try {
      const cart = await cartService.clearCart(req.user.id);
      res.json(cart);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};
