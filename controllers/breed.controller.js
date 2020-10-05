const db = require("../models");
const Breed = db.breed;

// Retrieve dog Breeds
exports.findDogs = (req, res) => {
    Breed.findAll( {
        where: {SpeciesId: 1},
        order: [
            ['BreedName', 'ASC']
        ],
        attributes: ['BreedId', 'BreedName']
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving dog breeds"
            });
        });
};

// Retrieve cat Breeds
exports.findCats = (req, res) => {
    Breed.findAll( {
        where: {SpeciesId: 2},
        order: [
            ['BreedName', 'ASC']
        ],
        attributes: ['BreedId', 'BreedName']
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cat breeds"
            });
        });
};

// Retrieves one breed via id
exports.findOne = (req, res) => {
    Breed.findOne( {
        where: {BreedId: req.params.id},
        attributes: ['BreedName']
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving breed with id=" + id
            });
        });
};

