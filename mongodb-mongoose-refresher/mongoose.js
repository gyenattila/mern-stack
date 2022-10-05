const mongoose = require('mongoose');

const Product = require('./models/product.model');

/**
 * This is just a local mongodb connection string running in docker
 * In real application this string should be stored in env variable.
 */
const url = 'mongodb://admin:admin@localhost:27222/?authMechanism=DEFAULT';
mongoose
  .connect(url)
  .then(() => console.log('Connected to db.'))
  .catch(error => console.log(error));

exports.createProduct = async (req, res, next) => {
  const { name, price } = req.body;

  const createdProduct = new Product({
    name,
    price,
  });

  const result = await createdProduct.save();

  res.json(result);
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find().exec();

  res.json(products);
};
