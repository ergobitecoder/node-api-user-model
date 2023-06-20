var express = require('express');
var router = express.Router();

const processAddressController = require('../controllers/processAddressController');

router.route('/process-address')
	.get(processAddressController.getData);

module.exports = router;
