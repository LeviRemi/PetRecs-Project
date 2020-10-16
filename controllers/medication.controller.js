const db = require("../models");
const Medication = db.medication;

// Create and Save a new Medication
exports.create = (req, res) => {
    // Validate request
    if (!req.body.DosageAmount || !req.body.Name || !req.body.DosageUnit || !req.body.PetId) {
        res.status(400).send({
            message: "Error. Essential fields are empty."
        });
        return;
    }

    // Create Medication
    const medication = {
        PetId: req.body.PetId,
        Name: req.body.Name,
        DosageAmount: req.body.DosageAmount,
        DosageUnit: req.body.DosageUnit,
        StartDate: req.body.StartDate || null,
        EndDate: req.body.EndDate || null,
        Notes: req.body.Notes || null
    };

    // Save Medication to database
    Medication.create(medication)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the medication"
            });
        })
};

// Retrieve all Medications for a specific pet id
exports.findAll = (req, res) => {
    const id = req.params.id;
    Medication.findAll( {
        where: {PetId: id}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Medications for PetId=" + id
            });
        });
};

// Find a single Medication with a MedId
exports.findOne = (req, res) => {
    const id = req.params.id;
    Medication.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error when retrieving Medication with MedId=" + id
            });
        });
};

// Update a single Medication identified by the request id
exports.update = (req, res) => {
    const id = req.params.id;
    Medication.update(req.body, {
        where: {MedId: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Medication was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Medication with id=${id}. Maybe Medication was not found or request body was empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Medication with id=" + id
            });
        });
};

// Delete a single Medication with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    Medication.destroy({
        where: {MedId: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Medication was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Medication with id=${id}. Maybe Medication was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Medication with id=" + id
            });
        });
};

