const express = require('express');
var commonFunc = require('../common.js');
const userService = require('../services/userService.js');
var userController = {};

// function to handle login request
userController.login = async function (req, res, callback) {

	// the variable validation_error is declared as an array, 
	// and the code checks if the fields is missing in the request body 
	// then that field is stored in validation_error array 
	let validation_error = [];

	if (!req.body.email) {
		validation_error.push('email');
	}

	if (!req.body.password) {
		validation_error.push('password');
	}

	// code checks if the validation_error array length i.e if any required field is empty 
	// will return error massage as response to request
	if (validation_error.length) {
		let validation_msg = validation_error.join(', ');
		commonFunc.send(res, 400, '', `Required ${validation_msg} fields.`);
		return;
	}

	// it checks email get from req body is valid or not
	if (!commonFunc.isEmailValid(req.body.email)) {
		commonFunc.send(res, 400, '', 'email not valid');
		return;
	}

	// variable named insertObj is declared as an empty object. 
	// The code then checks if the fields exists in the request body (req.body). 
	// If the fields exists, its value is assigned to the insertObj.field property.
	var insertObj = {};
	if (req.body.email) {
		insertObj.email = req.body.email;
	}

	if (req.body.password) {
		insertObj.password = req.body.password;
	}

	// call userService to handle login request
	// commonFunc is function created inside commonjs file used to send response either success or error
	try {
		let loginResponse = await userService.login(req, insertObj);
		commonFunc.send(res, loginResponse.code, loginResponse['data'], loginResponse.msg);
	} catch (error) {
		console.log(error);
		commonFunc.send(res, 503, '', error);
	}
}

// function to handle signUp request
userController.signUp = async function (req, res, callback) {

	// the variable validation_error is declared as an array, 
	// and the code checks if the fields is missing in the request body 
	// then that field is stored in validation_error array 
	let validation_error = [];

	if (!req.body.email) {
		validation_error.push('email');
	}

	if (!req.body.mobile) {
		validation_error.push('mobile');
	}

	if (!req.body.firstName) {
		validation_error.push('firstName');
	}

	if (!req.body.lastName) {
		validation_error.push('lastName');
	}

	if (!req.body.password) {
		validation_error.push('password');
	}

	// code checks if the validation_error array length i.e if any required field is empty 
	// will return error massage as response to request
	if (validation_error.length) {
		let validation_msg = validation_error.join(', ');
		commonFunc.send(res, 400, '', `Required ${validation_msg} fields.`);
		return;
	}

	if (!commonFunc.isEmailValid(req.body.email)) {
		commonFunc.send(res, 400, '', 'email not valid');
		return;
	}

	// variable named insertObj is declared as an empty object. 
	// The code then checks if the fields exists in the request body (req.body). 
	// If the fields exists, its value is assigned to the insertObj.field property.
	var insertObj = {};
	if (req.body.email) {
		insertObj.email = req.body.email;
	}

	if (req.body.mobile) {
		insertObj.mobile = req.body.mobile;
	}

	if (req.body.password) {
		insertObj.password = req.body.password;
	}

	if (req.body.firstName) {
		insertObj.firstName = req.body.firstName;
	}

	if (req.body.lastName) {
		insertObj.lastName = req.body.lastName;
	}
	insertObj.status = 1;

	// call userService to handle sign up request
	// commonFunc is function created inside commonjs file used to send response either success or error
	try {
		let signUpResponse = await userService.signup(req, insertObj);
		commonFunc.send(res, signUpResponse.code, signUpResponse['data'], signUpResponse.msg);
	} catch (error) {
		//console.log(error);
		commonFunc.send(res, 503, '', error);
	}
}

// function to handle refreshToken request
userController.refreshToken = async function (req, res, callback) {

	// the variable validation_error is declared as an array, 
	// and the code checks if the refreshToken is missing in the request body 
	// then that refreshToken string is stored in validation_error array 
	let validation_error = [];

	if (!req.body.refreshToken) {
		validation_error.push('refreshToken');
	}

	// code checks if the validation_error array length i.e if refreshToken field is empty 
	// will return error massage as response to request
	if (validation_error.length) {
		let validation_msg = validation_error.join(', ');
		commonFunc.send(res, 400, '', `Required ${validation_msg} fields.`);
		return;
	}

	var checkObj = {};
	if (req.body.refreshToken) {
		checkObj.refreshToken = req.body.refreshToken;
	}

	if (req.body.userId) {
		checkObj.userId = req.body.userId;
	}

	// call userService to handle refreshToken request
	// commonFunc is function created inside commonjs file used to send response either success or error
	try {
		let refreshTokenResponse = await userService.refreshToken(req, checkObj);
		commonFunc.send(res, refreshTokenResponse.code, refreshTokenResponse['data'], refreshTokenResponse.msg);
	} catch (error) {
		// console.log(error);
		commonFunc.send(res, 503, '', error);
	}
}

module.exports = userController;
