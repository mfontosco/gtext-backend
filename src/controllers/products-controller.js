const productService = require('../services/products-service');

exports.getAllProducts = async (req, res) => {
   const products = await productService.getAllProducts();
   res.json(products);
};

exports.getProductById = async (req, res) => {
   const product = await productService.getProductById(req.params.id);
   if (!product) return res.status(404).json({ message: 'Product not found' });
   res.json(product);
};

exports.createProduct = async (req, res) => {
   const product = await productService.createProduct(req.body);
   res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
   const product = await productService.updateProduct(req.params.id, req.body);
   if (!product) return res.status(404).json({ message: 'Product not found' });
   res.json(product);
};

exports.deleteProduct = async (req, res) => {
   await productService.deleteProduct(req.params.id);
   res.json({ message: 'Product deleted' });
};
