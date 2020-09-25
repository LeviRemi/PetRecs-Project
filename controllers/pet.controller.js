const db = require("../models");
const Pet = db.pet;
const Contact = db.petContact;
const Account = db.account;
const Event = db.petEvent;
const Weight = db.petWeight;

// Create and Save a new Pet
exports.create = (req, res, next) => {
    // Validate request
    if (!req.body.SpeciesId || !req.body.PetName || !req.body.PetGender) {
        res.status(400).send({
            message: "Error. Essential fields are empty."
        });
        return;
    }

    const defaultDog = "https://firebasestorage.googleapis.com/v0/b/petrecs-file-system.appspot.com/o/dog_default.svg?alt=media&token=893cb1b6-cf61-4094-96a1-0faccbfa1d15";

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
        ProfileUrl: defaultDog
    };

    // Save Pet to database
    Pet.create(pet)
        .then(data => {
            // Save corresponding Pet Contact
            Contact.create({
                AccountId: req.session.user.AccountId,
                PetId: data.PetId,
                Owner: 1
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

    // Validate that user has access to pet
    Contact.findOne({
        where: {PetId: req.params.id, AccountId: req.session.user.AccountId}
    })
        .then(data => {
            if (data === null) {
                res.status(401).send("This user does not have access to this pet, or pet does not exist");
            } else {
                return Pet.findByPk(id)
                    .then(data => {
                        if (data === null) {
                            res.status(400).send("Pet not found");
                        } else {
                            res.send(data);
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error when retrieving Pet with id=" + id
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send( {
                message:
                    err.message || "Some error occurred while validating if user has access to pet"
            });
        });


};

// Update a single Pet identified by the request id
exports.update = (req, res) => {
    const id = req.params.id;
    const body = req.body;

    Pet.update(body, {
        where: {PetId: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pet was updated successfully."
                });
            } else {
                console.log(req.body)
                res.send({
                    message: `Cannot update Pet with id=${id}. Maybe Pet was not found or request body was empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error updating Pet with id=" + id
            });
        });
};

// Delete a single Pet with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    // Verify that user is owner of pet they are trying to destroy
    Contact.findOne({
        where: {PetId: req.params.id, AccountId: req.session.user.AccountId}
    })
        .then(data => {
            if (data === null || !data.Owner) {
                res.status(401).send("This user does not own this pet, or pet does not exist");
            } else {
                // Destroy associated Pet Contacts
                return Contact.destroy({
                    where: {PetId: req.params.id}
                })
                    .then(data => {
                        // Destroy associated Pet Events
                        return Event.destroy({
                            where: {PetId: req.params.id}
                        })
                            .then(data => {
                                // Destroy associated Pet Weights
                                return Weight.destroy({
                                    where: {PetId: req.params.id}
                                })
                                    .then(data => {
                                        // Destroy pet
                                        return Pet.destroy({
                                            where: {PetId: id}
                                        })
                                            .then(num => {
                                                if (num === 1) {
                                                    res.status(200).send({
                                                        message: "Pet was deleted successfully!"
                                                    });
                                                } else {
                                                    res.status(500).send({
                                                        message: `Cannot delete Pet with id=${id}. Maybe Pet was not found.`
                                                    });
                                                }
                                            })
                                            .catch(err => {
                                                res.status(500).send({
                                                    message:
                                                        err.message || "Could not delete Pet with id=" + id
                                                });
                                            });
                                    })
                                    .catch(err => {
                                        res.status(500).send( {
                                            message:
                                                err.message || "Some error occurred while destroying associated weights"
                                        });
                                    })
                            })
                            .catch(err => {
                                res.status(500).send( {
                                    message:
                                        err.message || "Some error occurred while destroying associated events"
                                });
                            });
                    })
                    .catch(err => {
                        res.status(500).send( {
                            message:
                                err.message || "Some error occurred while destroying associated contacts"
                        });
                    })
            }
        })
        .catch(err => {
            res.status(500).send( {
                message:
                    err.message || "Some error occurred while validating if user is owner of pet"
            });
        });
};

// Share a single Pet with the specified id to a specified account with email
exports.share = (req, res, next) => {
    const id = req.params.id;
    const email = req.body.Email;

    // Validate that user is owner of pet
    Contact.findOne({
        where: {PetId: req.params.id, AccountId: req.session.user.AccountId, Owner: 1}
    })
        .then(data => {
            if (data === null) {
                res.status(401).send("This user is not owner of this pet, or pet does not exist");
            } else {
                // Check if account exists
                return Account.findOne({
                    where: {Email: email}
                })
                    .then(data => {
                        if (data === null) {
                            res.status(400).send("Account does not exist with that email");
                        } else {
                            let acct = data.AccountId;
                            // Check if pet is already being shared with this account
                            return Contact.findOne({
                                where: {AccountId: acct, PetId: id}
                            })
                                .then(data => {
                                    if (data !== null) {
                                        res.status(400).send("Account already has access to this pet")
                                    } else {
                                        // Share pet with account
                                        return Contact.create({
                                            AccountId: acct, PetId: id
                                        })
                                            .then(data => {
                                                res.status(200).send(`Pet ${id} has been shared with account ${acct}!`);
                                            })
                                            .catch(err => {
                                                res.status(500).send(err.message || `Could not share Pet ${id} with account ${acct}`);
                                            })
                                    }
                                })
                                .catch(err => {
                                    res.status(500).send(err.message || `Error when checking if pet ${id} is already shared with account ${acct}`);
                                })
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Error when checking account existence with email=" + email
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send( {
                message:
                    err.message || "Some error occurred while validating if user is owner of pet"
            });
        });

}

