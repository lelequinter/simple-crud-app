const mongoose = require('mongoose');

//* Model: Is essentialy something we can use to store date into our DB,
//! Note- Everything we want to store it has to be a model
const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        },

        price: {
            type: Number,
            required: true,
            default: 0
        },

        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product;