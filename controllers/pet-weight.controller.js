const db = require("../models");
const PetWeight = db.petweight;

// Create and Save a new Pet Weight
exports.create = (req, res) => {
    // Validate request
    if (!req.body.PetId || !req.body.Weight || !req.body.Date) {
        res.status(400).send({
            message: "Error. Essential fields are empty."
        });
        return;
    }

    // Create Weight
    const petweight = {
        PetWeightId: req.body.PetWeightId,
        PetId: req.body.PetId,
        Weight: req.body.Weight,
        Date: req.body.Date
    };

    // Save Pet Weight to database
    PetWeight.create(petweight)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the pet weight"
            });
        })
};

// Retrieve all Pet Weights for a specific pet id
exports.findAll = (req, res) => {
    const id = req.params.id;
    PetWeight.findAll( {
        where: {PetId: id}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Pet Weights for PetId=" + id
            });
        });
};

// Find a single Pet Weight with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    PetWeight.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error when retrieving Pet Weight with id=" + id
            });
        });
};

// Update a single Pet Weight identified by the request id
exports.update = (req, res) => {
    const id = req.params.id;
    PetWeight.update(req.body, {
        where: {PetWeightId: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Pet Weight was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pet Weight with id=${id}. Maybe Pet was not found or request body was empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pet Weight with id=" + id
            });
        });
};

// Delete a single Pet Weight with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    PetWeight.destroy({
        where: {PetWeightId: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Pet Weight was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pet Weight with id=${id}. Maybe Pet was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pet Weight with id=" + id
            });
        });
};

