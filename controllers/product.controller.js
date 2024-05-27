const Product = require('../models/product.model');

//* Get all products
const getProducts = async (_, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//* Get product by id
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//* Create a product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//* Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const product = await Product.findByIdAndUpdate(id, body);

        if( !product ){
            return res.status(404).json({message: 'Product not found'});
        }

        //! NOTE: If something is updated is better to check it again
        const updatedProduct = await Product.findById(id);

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//! Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product){
            return res.status(404).json({message: 'Product not found'});
        }

        res.status(200).json({message: 'Product deleted successfully'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}