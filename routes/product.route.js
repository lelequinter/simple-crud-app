const express = require('express');

const router = express.Router();

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller.js');

//* Get all products
router.get('/', getProducts);
//* Get product by id
router.get('/:id', getProduct);
//* Create a product
router.post('/', createProduct);
//* Update a product
router.put('/:id', updateProduct);
//! Delete a product
router.delete('/:id', deleteProduct);

module.exports = router;
