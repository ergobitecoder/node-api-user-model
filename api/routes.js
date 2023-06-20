const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const processAddressRoutes = require('./routes/processAddressRoutes');

const customRoutes = function (app) {
	app.use('/api/user', userRoutes);
	app.use('/api/product', productRoutes);
	app.use('/api/', processAddressRoutes);
	app.use('/api/', async (req, res) => {
		res.status(200).json('Latest Dev');
	});
};

module.exports = customRoutes;