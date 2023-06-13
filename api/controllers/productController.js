var commonFunc = require('../common.js');
const productService = require('../services/productService');
var productController = {};

// function to handle product create request
productController.create = async function (req, res, callback) {
	var resObj = {};
	let param = req.body;

	// the variable validation_error is declared as an array, 
	// and the code checks if the fields is missing in the request body 
	// then that field is stored in validation_error array 
	let validation_error = [];

	if (!param.name) {
		validation_error.push('product name');
	}

	if (!param.description) {
		validation_error.push('description');
	}
	if (!param.vendor) {
		validation_error.push('vendor');
	}

	if (!param.price) {
		validation_error.push('price');
	}

	if (!param.currency) {
		validation_error = push('currency');
	}

	// code checks if the validation_error array length i.e if any required field is empty 
	// will return error massage as response to request
	if (validation_error.length) {
		let validation_msg = validation_error.join(', ');
		commonFunc.send(res, 400, '', `Required ${validation_msg} fields.`);
		return;
	}

	// check name field in req body should contain alphabet only
	if (!commonFunc.isNameValid(param.name)) {
		commonFunc.send(res, 400, '', 'Name should contain alphabet only');
		return;
	}

	// check price field in req body should contain number only
	if (!commonFunc.isNumberValid(param.price)) {
		commonFunc.send(res, 400, '', 'Price should contain number only');
		return;
	}

	// variable named insertObj is declared as an empty object. 
	// The code then checks if the fields exists in the request body (req.body). 
	// If the fields exists, its value is assigned to the insertObj.field property.
	var insertObj = {};

	if (param.name) {
		insertObj.name = param.name;
	}

	if (param.description) {
		insertObj.description = param.description;
	}
	if (param.vendor) {
		insertObj.vendor = param.vendor;
	}

	if (param.price) {
		insertObj.price = param.price;
	}

	if (param.publishedAt) {
		insertObj.publishedAt = param.publishedAt;
	}

	if (param.currency) {
		insertObj.currency = param.currency;
	}

	insertObj.status = 1;

	// call userService to handle login request
	// commonFunc is function created inside commonjs file used to send response either success or error
	try {
		let productResponse = await productService.create(req, insertObj);
		commonFunc.send(res, productResponse.code, productResponse['data'], productResponse.msg);
	} catch (error) {
		//console.log(error);
		commonFunc.send(res, 503, '', error);
	}

}

module.exports = productController;
