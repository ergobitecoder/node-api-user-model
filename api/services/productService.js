var commonFunc = require('../common.js');
const mongoose = require('mongoose');
let productService = {};

productService.create = async function (req, data) {
	var productModel = req.db.productModel;

	let result = {};

	// check name field is already present or not if present return message Product Name Already Exist
	if (data.name) {
		var product_name = await productModel.findOne({ 'name': data.name });
		if (product_name && product_name.status !== 2) {
			result['msg'] = "Product Name Already Exist";
			result['code'] = 400;
			return result;
		}
	}

	var new_product = await productModel.create(data);
	result['data'] = new_product;
	result["msg"] = "Product Created Successfully";
	result['code'] = 200;
	return result;
}

module.exports = productService;