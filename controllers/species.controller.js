const db = require("../models");
const Species = db.species;

// Retrieve all Species
exports.findAll = (req, res) => {
    Species.findAll( {
        order: [
            ['SpeciesName', 'ASC']
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving species"
            });
        });
};

// Retrieves one species via id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Species.findOne( {
        where: {SpeciesId: id}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving species with id=" + id
            });
        });
};

