var commonFunc = require('../common.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
let userService = {};

userService.login = async function (req, data) {
	var userModel = req.db.userModel;
	let result = {};

	var user = await userModel.findOne({ 'email': data.email });

	// check Email Id get in request is avialable in user model or not if not return massage Email Id not Found
	if (!user) {
		result['msg'] = "Email Id not Found";
		result['code'] = 400;
		return result;
	}

	// check password come in request and user password in user model
	const isPasswordValid = await bcrypt.compare(data.password, user.password);

	// check password entered by user and email associated with that password if match then login else return msg invalid password
	if (!isPasswordValid) {
		result['msg'] = "Invalid Password";
		result['code'] = 400;
		return result;
	}
	// Generate a JWT access token
	// set refresh token expiration time to 7 days from now
	const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

	// Generate a refresh token and store it in the database
	const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
	user.refreshToken = refreshToken;
	user.refreshTokenExp = Date.now() + 7 * 24 * 60 * 60 * 1000; // set refresh token expiration time to 7 days from now
	await user.save();

	result['data'] = {
		user,
		accessToken,
		refreshToken
	};
	result["msg"] = "Login Successfully";
	result['code'] = 200;
	return result;
}

//service to create new user
userService.signup = async function (req, data) {
	var userModel = req.db.userModel;
	let result = {};

	// check Email is there already exist or not if exist return massage Email Id Already Exist. 
	if (data.email) {
		var existingUser = await userModel.findOne({ 'email': data.email });
		if (existingUser) {
			result['msg'] = "Email Id Already Exist";
			result['code'] = 400;
			return result;
		}
	}

	// check mobile number is there already exist or not if exist return massage Mobile number Already Exist. 
	if (data.mobile) {
		var phone = await userModel.findOne({ 'mobile': data.mobile });
		if (phone) {
			result['msg'] = "Mobile number Already Exist";
			result['code'] = 400;
			return result;
		}
	}

	// converts a plain-text password into a fixed-length string of characters, 
	// which cannot be reversed back to the original password.
	const hashedPassword = await bcrypt.hash(data.password, 10);
	const user = new userModel({ email: data.email, mobile: data.mobile, firstName: data.firstName, lastName: data.lastName, password: hashedPassword, status: data.status });
	await user.save();

	// Generate a JWT access token
	const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });// set refresh token expiration time to 1 day from now

	// Generate a refresh token and store it in the database
	const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
	user.refreshToken = refreshToken;
	user.refreshTokenExp = Date.now() + 7 * 24 * 60 * 60 * 1000; // set refresh token expiration time to 7 days from now
	await user.save();

	result['data'] = { user, accessToken, refreshToken };
	result["msg"] = "SignUp Successfully";
	result['code'] = 200;
	return result;
}

// service for refreshToken
userService.refreshToken = async function (req, data) {
	var userModel = req.db.userModel;
	let result = {};
	const decoded = jwt.verify(data.refreshToken, process.env.JWT_REFRESH_SECRET);

	// find userId from database which match with decoded userId
	const user = await userModel.findOne({ _id: decoded.userId });
	let refreshToken = data.refreshToken;

	// check refresh token is expired or not
	if (Date.now() > user.refreshTokenExp) {
		refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
		user.refreshToken = refreshToken;
		user.refreshTokenExp = Date.now() + 7 * 24 * 60 * 60 * 1000; // set refresh token expiration time to 7 days from now
		await user.save();
	}

	// check userId and decoded userId which get from refershToken associated with
	if (decoded.userId !== data.userId) {
		result.msg = 'Invalid refresh token';
		result.code = 401;
		return result;
	}

	// Generate new access token
	const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
	result.data = {
		accessToken,
		refreshToken
	};
	result.msg = 'Token Refreshed';
	result.code = 200;
	return result;
}

module.exports = userService;
