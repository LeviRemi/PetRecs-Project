// routes/index.js
const router = require('express').Router();
const petRoutes = require('./pet.routes.js');
const path = require('path');

// API routes
router.use('/api/pets', petRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;