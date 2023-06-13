const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productModel = new Schema({

    name: {
        type: String,
        required: true,
        text: true,
        trim: true,
    },
    description: {
        type: String,
        text: true,
        trim: true,
    },
    vendor: {
        type: String,
    },

    publishedAt: {
        type: String,
        text: true,
        trim: true,
    },

    price: {
        type: Number,
    },
    status: {
        type: Number,
        enum: [0, 1, 2],//0-inactive,1-active,2-deleted
        required: true,
    },
    currency: {
        type: String,
        trim: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});


// Export the model
module.exports = productModel;
