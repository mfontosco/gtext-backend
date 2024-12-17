const Product = require('../models/product');
const User = require('../models/users');

exports.getAllProducts = async (req) => {
   // const { username } = req;
   // const user = await .findOne({ username });
   let products = await Product.find({});

   return products;
};

exports.getProductById = async (param) => {
   const { id } = param;
   const product = await Product.findById(id);
   return product;
};

exports.createProduct = async (data) => {
   const { name, description, price, stock, category } = data;
   const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
   });
   await newProduct.save();
   return {
      data: newProduct,
   };
};

exports.updateProduct = async (id, data) => {
   console.log('id--------', id);
   const { name, description, price, stock } = data;
   const productToBeUpdated = await Product.findById(id);
   if (!productToBeUpdated) {
      return 'Product not found';
   }
   if (name) {
      productToBeUpdated.name = name;
   }
   if (description) {
      productToBeUpdated.name = description;
   }
   if (price) {
      productToBeUpdated.price = price;
   }
   if (stock) {
      productToBeUpdated.stock = stock;
   }
   productToBeUpdated.save();
   return {
      data: productToBeUpdated,
   };
};

exports.deleteProduct = async (id) => {
   await Product.findByIdAndDelete(id);
   return {
      message: `product with ID ${id} successfully deleted`,
   };
};
