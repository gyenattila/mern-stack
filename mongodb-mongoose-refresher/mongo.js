const MongoClient = require('mongodb').MongoClient;

/**
 * This is just a local mongodb connection string running in docker
 * In real application this string should be stored in env variable.
 */
const url = 'mongodb://admin:admin@localhost:27222/?authMechanism=DEFAULT';

exports.createProduct = async (req, res, next) => {
  const { name, price } = req.body;

  const newProduct = {
    name,
    price,
  };

  const client = new MongoClient(url);
  await client.connect();
  const db = client.db('mernDB');

  try {
    await db.collection('products').insertOne(newProduct);
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Could not store data.' });
  }

  client.close();

  res.json(newProduct);
};

exports.getProducts = async (req, res, next) => {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db('mernDB');

  let result;

  try {
    result = await db.collection('products').find().toArray();
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Could not restore data.' });
  }

  client.close();

  res.json(result);
};
