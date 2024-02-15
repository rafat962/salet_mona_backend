const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/productsModel');


dotenv.config({ path: './config.env' });



mongoose.connect(process.env.DB).then(() => console.log('DB connection successfully'));


// READ JSON FILE
const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
try {
    await Product.create(products);
    console.log('Data successfully loaded!');
} catch (err) {
    console.log(err);
}
process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
