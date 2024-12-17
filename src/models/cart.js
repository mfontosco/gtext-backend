const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
   productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
   },
   quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
   },
   items: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema);
