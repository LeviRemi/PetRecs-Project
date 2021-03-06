const db = require("../models");
const PetRecord = db.petRecord;

// Create and Save a new Pet Weight
exports.create = (req, res) => {
    
    // Validate request
    if (!req.body.PetId || !req.body.RecordUrl || !req.body.RecordName || !req.body.UploadDate || !req.body.FileName) {
        res.status(400).send({
            message: "Error. Essential fields are empty."
        });
        return;
    }

    // Create Record
    const petrecord = {
        //PetRecordId: req.body.PetRecordId,
        PetId: req.body.PetId,
        RecordName: req.body.RecordName,
        RecordUrl: req.body.RecordUrl,
        FileName: req.body.FileName,
        UploadDate: req.body.UploadDate
    };
    //console.log(petrecord);
    // Save Pet Weight to database
    PetRecord.create(petrecord)
        .then(data => {
            //console.log(data);
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the pet record"
            });
        })
};

// Retrieve all Pet Records for a specific pet id
exports.findAll = (req, res) => {
    const id = req.params.id;
    PetRecord.findAll( {
        where: {PetId: id}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Pet Records for PetId=" + id
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

// Update a single Pet Record identified by the request id
exports.update = (req, res) => {
    const id = req.params.id;
    PetRecord.update(req.body, {
        where: {PetRecordId: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Pet Record was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pet Record with id=${id}. Maybe Pet was not found or request body was empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pet Record with id=" + id
            });
        });
};

// Delete a single Pet Record with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    PetRecord.destroy({
        where: {PetRecordId: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Record was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete record with id=${id}. Maybe Pet was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete record with id=" + id
            });
        });
};

