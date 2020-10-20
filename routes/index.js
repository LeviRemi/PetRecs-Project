// routes/index.js
const router = require('express').Router();
const path = require('path');

// API routes
const apiPet = require('./pet.routes');
router.use('/api/pets', apiPet);

const apiPetWeight = require('./pet-weight.routes');
router.use('/api/pet-weights', apiPetWeight);

const apiAccount = require('./account.routes');
router.use('/api/accounts', apiAccount);

const apiPetEvent = require('./pet-event.routes');
router.use('/api/pet-events', apiPetEvent);

const apiSession = require('./session.routes');
router.use('/api/sessions', apiSession);

const apiSpecies = require('./species.routes');
router.use('/api/species', apiSpecies);

const apiBreed = require('./breed.routes');
router.use('/api/breeds', apiBreed);

const apiFileUpload = require('./firebase.routes');
router.use('/api/upload', apiFileUpload);

const apiPetRecord = require('./pet-record.routes');
router.use('/api/pet-records', apiPetRecord);

const apiMedication = require('./medication.routes');
router.use('/api/medications', apiMedication);

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;