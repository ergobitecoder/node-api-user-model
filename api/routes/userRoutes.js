var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/auth');

const userController = require('../controllers/userController');

//to login user
router.route('/login')
	.post(userController.login);

//to signup new user
router.route('/signup')
	.post(userController.signUp);

//to refresh authToken
router.route('/refreshToken')
	.post(userController.refreshToken);

module.exports = router;
