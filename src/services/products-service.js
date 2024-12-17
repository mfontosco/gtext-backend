const Product = require('../models/product');
const User = require('../models/users');
const cloudinary = require('../utils/cloudinary');

exports.getAllProducts = async (req) => {
   // const { username } = req;
   // const user = await .findOne({ username });
   let products = await Product.find({});

   return products;
};

exports.getProductById = async (param) => {
   // // const { idconst cleanId = id.trim(); } = param;
   // console.log('id', id);
   const cleanId = param.trim();
   const product = await Product.findById(cleanId);
   return product;
};

exports.createProduct = async (data, imageFile) => {
   const { name, description, price, stock, category } = data;

   let imageUrl = '';
   if (imageFile) {
      try {
         const result = await cloudinary.uploader.upload(imageFile.path, {
            folder: 'products/',
         });
         imageUrl = result.secure_url;
      } catch (error) {
         console.log('error', error);
         throw new Error('Error uploading image to Cloudinary');
      }
   }

   const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
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
