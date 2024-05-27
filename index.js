const express = require('express');
const mongoose = require('mongoose');

const productRoute = require('./routes/product.route.js');

const app = express();

//? Middleware
//* Enable send json body to requests
app.use(express.json());
//* Enable send FORM-URL-ENCODE to requests
app.use(express.urlencoded({extended: false}));

//* Routes
app.use('/api/products', productRoute);


//? Test if the api is Up!
app.get('/', (_, res) => {
    res.send('Hello From Node API');
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