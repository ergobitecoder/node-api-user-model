var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/auth');

const productController = require('../controllers/productController');

// to create new product but validated user can add product only
router.route('/')
    .post(verifyToken,productController.create);

module.exports = router;