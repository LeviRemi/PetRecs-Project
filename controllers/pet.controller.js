const db = require("../models");
const Pet = db.pet;
const Contact = db.petContact;

// Create and Save a new Pet
exports.create = (req, res) => {
    // Validate request
    if (!req.body.SpeciesId || !req.body.BreedId || !req.body.PetName || !req.body.PetGender) {
        res.status(400).send({
            message: "Error. Essential fields are empty."
        });
        return;
    }

    // Create Pet
    const pet = {
        SpeciesId: req.body.SpeciesId,
        BreedId: req.body.BreedId,
        PetName: req.body.PetName,
        PetGender: req.body.PetGender,
        PetAgeYear: req.body.PetAgeYear,
        PetAgeMonth: req.body.PetAgeMonth,
        PetAgeDay: req.body.PetAgeDay,
        AllergyNotes: req.body.AllergyNotes,
        FoodNotes: req.body.FoodNotes,
        CareNotes: req.body.CareNotes,
        ProfileUrl: req.body.ProfileUrl
    };

    // Save Pet to database
    Pet.create(pet)
        .then(data => {
            // Save corresponding Pet Contact
            Contact.create({
                AccountId: req.session.user.AccountId,
                PetId: data.PetId
            }).then(data => {
                console.log(data)
            }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the pet contact"
                });
            })
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the pet"
            });
        })
};

// Retrieve all Pets from the database belonging to specific user
exports.findAll = (req, res) => {
    if(!req.session.user) {
        res.status(401).send("You are not logged in.");
        return;
    }

    let contactArr = [];

    Contact.findAll({
        where: { AccountId: req.session.user.AccountId}
    })
        .then(data => {
            for(let i = 0; i < data.length; i++) {
                contactArr.push(data[i].PetId);
            }
            Pet.findAll( {
                where: { PetId: contactArr }
            })
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving Pets."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Pet Contacts."
            });
        });
};

// Find a single Pet with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Pet.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error when retrieving Pet with id=" + id
            });
        });
};

// Update a single Pet identified by the request id
exports.update = (req, res) => {
    const id = req.params.id;
    Pet.update(req.body, {
        where: {PetId: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Pet was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pet with id=${id}. Maybe Pet was not found or request body was empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pet with id=" + id
            });
        });
};

// Delete a single Pet with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    Pet.destroy({
        where: {PetId: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Pet was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pet with id=${id}. Maybe Pet was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pet with id=" + id
            });
        });
};

