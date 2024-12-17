const Cart = require('../models/cart');
const Product = require('../models/product');

// Get the cart for a specific user
exports.getCart = async (userId) => {
   let cart = await Cart.findOne({ userId }).populate(
      'items.productId',
      'name price'
   );
   if (!cart) {
      cart = await Cart.create({ userId, items: [] });
   }
   return cart;
};

// Add a product to the user's cart
exports.addToCart = async (userId, productId, quantity) => {
   console.log('productId', productId);
   const product = await Product.findById(productId);
   if (!product) throw new Error('Product not found');

   let cart = await Cart.findOne({ userId });
   if (!cart) {
      cart = await Cart.create({ userId, items: [] });
   }

   const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
   );
   if (itemIndex > -1) {
      // Update quantity if product already exists in cart
      cart.items[itemIndex].quantity += quantity;
   } else {
      // Add new product to cart
      cart.items.push({ productId, quantity });
   }

   await cart.save();
   return cart;
};

// Update the quantity of a specific item in the cart
exports.updateCartItem = async (userId, productId, quantity) => {
   const cart = await Cart.findOne({ userId });
   if (!cart) throw new Error('Cart not found');

   const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
   );
   if (itemIndex > -1) {
      if (quantity === 0) {
         // Remove item if quantity is set to 0
         cart.items.splice(itemIndex, 1);
      } else {
         // Update the item's quantity
         cart.items[itemIndex].quantity = quantity;
      }
      await cart.save();
      return cart;
   } else {
      throw new Error('Product not in cart');
   }
};

// Remove a specific item from the cart
exports.removeFromCart = async (userId, productId) => {
   const cart = await Cart.findOne({ userId });
   if (!cart) throw new Error('Cart not found');

   cart.items = cart.items.filter((item) => !item.productId.equals(productId));
   await cart.save();
   return cart;
};

// Clear the entire cart
exports.clearCart = async (userId) => {
   const cart = await Cart.findOne({ userId });
   if (!cart) throw new Error('Cart not found');

   cart.items = [];
   await cart.save();
   return cart;
};
