const productService = require('../services/products-service');
const multer = require('multer');

// Set up multer storage options (you can customize this based on your needs)
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Folder to store the image temporarily before uploading to Cloudinary
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
   },
});

const upload = multer({ storage: storage }).single('image');

exports.getAllProducts = async (req, res) => {
   const products = await productService.getAllProducts();
   res.json(products);
};

exports.getProductById = async (req, res) => {
   const product = await productService.getProductById(req.params.id);
   if (!product) return res.status(404).json({ message: 'Product not found' });
   res.json(product);
};

// Create a new product with an image upload
exports.createProduct = async (req, res) => {
   upload(req, res, async (err) => {
      if (err) {
         console.log('err', err);
         return res.status(400).json({ message: 'Image upload failed' });
      }

      try {
         const product = await productService.createProduct(req.body, req.file);
         res.status(201).json(product);
      } catch (error) {
         res.status(400).json({ message: error.message });
      }
   });
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
