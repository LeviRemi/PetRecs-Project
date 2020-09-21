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

