const { Worker, isMainThread, parentPort } = require('worker_threads');
const { processAddresses } = require('../services/processAddressService');
var commonFunc = require('../common.js');
var processAddressController = {}

// // Main execution logic
processAddressController.getData = async function (req, res, callback) {
	if (isMainThread) {
		const addresses = [
			'123 Main St, City1, State1, Country1',
			'456 Elm St, City2, State2, Country2',
			// ... add more addresses
		];

		processAddresses(addresses)
			.then((results) => {
				console.log("final response", results);
				// Process the results as needed
				res.status(200).json(results);
			})

			.catch((error) => {
				console.error('Error processing addresses:', error.message);
			});
	}
};


module.exports = processAddressController

