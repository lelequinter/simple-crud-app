const express = require('express');
const mongoose = require('mongoose');

const Product = require('./models/product.model.js');

const app = express();

//* Enable send json body to requests
app.use(express.json());
//* Enable send FORM-URL-ENCODE to requests
app.use(express.urlencoded({extended: false}));

//? Test if the api works
app.get('/', (_, res) => {
    res.send('Hello From Node API');
});

//* Get all products
app.get('/api/products', async (_, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//* Get product by id
app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//* Create a product
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

});

//* Update a product
app.put('/api/product/:id', async (req, res) => {
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
});

//! Delete a product
app.delete('/api/product/:id', async (req, res) => {
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
});

//* Conetando la DB de mongo a travez de Mongoose
mongoose.connect('mongodb+srv://lelequinter:hRwIZGcUDYGG2zX6@simple-backenddb.j7bwuew.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Simple-BackendDB')
.then(() => {
    console.log('Connected to database');

    //* Correr el server una vez la DB este conectada
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log('Cannot connect to database');
})