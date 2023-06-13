var commonFunc = require('../common.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

	// to extract the value of the "Authorization" header from an HTTP request.
	const authHeader = req.headers['authorization'];

	// is used to extract the token from the "Authorization" header value.
	const token = authHeader && authHeader.split(' ')[1];

	// check token if not will give massage Access Token Not Found
	if (!token) {
		return res.status(401).json({ message: 'Access Token Not Found' });
	}

	// verifies the token using the jsonwebtoken library 
	// and the JWT secret stored in the JWT_SECRET environment variable.
	// The callback function receives two parameters: err and decoded.
	// If there is an error during token verification, the err parameter will be populated with the error information.
	// If the token is successfully verified, the decoded parameter will contain the decoded payload of the token.
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		req.user = { id: decoded.id };
		next();
	});

};

module.exports = verifyToken;