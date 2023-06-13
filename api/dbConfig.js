const mongoose = require('mongoose');
const config = require('./utils/config');
const mysql = require('mysql');
const userSchema = require('./models/userModel');
const productSchema = require('./models/productModel');

module.exports = function (req, res, next) {
    if (!global.conn) {
        // Set up mongoose connection
        mongoose.set('strictQuery', false);
        const conn = mongoose.createConnection(config.mongoose.url, config.mongoose.options);
        //const conn = mongoose.connect("mongodb://127.0.0.1:27017/ArtDB",{useNewUrlParser: true});

        global.conn = conn;

    }

    req.db = {
        userModel: global.conn.model('user', userSchema),
        productModel: global.conn.model('product', productSchema),
    };

    global.db = req.db;
    next();
};