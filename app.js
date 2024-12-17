const dotenv = require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/routes/users-route');
const productRoutes = require('./src/routes/products-route');
const cartRoutes = require('./src/routes/carts-route');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./src/configs/db');
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());

const port = process.env.PORT || 8001;

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.get('/', async (req, res) => {
   res.send('welcome to my e-commerce web app');
});

const start = async (port) => {
   try {
      const conn = await connectDB();
      app.listen(port, (err) => {
         if (err) {
            throw err;
         }
         console.log(`server is running on port ${port}`);
      });
   } catch (err) {
      console.log(err);
   }
};

start(port);
