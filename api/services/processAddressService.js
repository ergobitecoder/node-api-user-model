const { Worker, isMainThread, parentPort } = require('worker_threads');
var processAddressService = {};

// Function to process addresses using worker threads
function processAddresses(addresses) {
	return new Promise((resolve, reject) => {
		const numWorkers = addresses.length;
		const results = new Array(numWorkers);

		// Create a worker for each address
		const workers = addresses.map((address, index) => {
			// console.log("address", address);
			// console.log("index", index);
			return new Worker('./api/worker.js', { workerData: { index, address } });
		});

		// console.log("workers", workers);

		// Handle messages from workers
		workers.forEach((worker, index) => {
			worker.on('message', (result) => {
				results[index] = result;
				checkCompletion();
			});

			worker.on('error', (error) => {
				console.error(`Worker ${index} encountered an error:`, error);
				checkCompletion();
			});

			worker.on('exit', () => {
				console.log(`Worker ${index} has exited`);
				checkCompletion();
			});
		});

		// Function to check if all workers have completed
		function checkCompletion() {
			if (!results.includes(undefined)) {
				// All workers have completed
				// console.log("results", results);
				if (parentPort) {
					parentPort.postMessage(results);
				}
				resolve(results); // Resolve the promise with the results
			}
		}


	});

}

module.exports = {
	processAddresses
};