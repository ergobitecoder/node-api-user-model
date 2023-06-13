const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
//middleware
const customRoutes = require('./api/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpec = require('./api/swagger');
const config = require('./api/utils/config');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const { port } = config;

// it  allow any domain to make cross origin request
// which headers are in cross origin request
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
	res.header("Access-Control-Allow-Methods", "*");
	next();
});

// Swagger UI library to serve and display the Swagger documentation based on the generated Swagger specification (swaggerSpec).
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


global.db = {};
global.conn = undefined;

const dbConfig = require('./api/dbConfig');

app.use(dbConfig);
customRoutes(app);

//Handle 404
app.use(function (req, res) {
	//console.log(req.originalUrl);
	var errObj = {};
	errObj.status = 'fail';
	errObj.msg = 'No such url found';
	res.json(errObj);

});



console.log(`listen on ${port}`);
app.listen(port);

module.exports = app;