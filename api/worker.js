const { parentPort, workerData } = require('worker_threads');

// Function to fetch geocode for a single address
async function getLatLng(address) {
  let lat = "18.516726";
  let lng = "73.856255";
  return { address, lat, lng };
}

// Code to be executed by each worker
const { index, address } = workerData;
getLatLng(address)
  .then((result) => {
    parentPort.postMessage(result);
  })
  .catch((error) => {
    console.error(`Error processing address ${index}:`, error.message);
    parentPort.postMessage({ address, error: 'Processing failed' });
  });