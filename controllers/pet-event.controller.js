const db = require("../models");
const PetEvent = db.petEvent;

// Create and Save a new Pet Event
exports.create = (req, res) => {
    // Validate request
    if (!req.body.EventTypeId || !req.body.PetId || !req.body.EventDescription || !req.body.Date) {
        res.status(400).send({
            message: "Error. Essential fields are empty."
        });
        return;
    }

    // Create Event
    const petEvent = {
        EventTypeId: req.body.EventTypeId,
        PetId: req.body.PetId,
        EventDescription: req.body.EventDescription,
        Date: req.body.Date
    };

    // Save Pet Event to database
    PetEvent.create(petEvent)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the pet event"
            });
        })
};

// Retrieve all Pet Events for a specific PetId
exports.findAll = (req, res) => {
    const id = req.params.id;
    PetEvent.findAll( {
        where: {PetId: id}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Pet Events for PetId=" + id
            });
        });
};

// Retrieve all Pet Events of a specific EventType for a specific PetId
exports.findAllOfType = (req, res) => {
    const id = req.params.id;
    const eventTypeId = req.params.EventTypeId;
    PetEvent.findAll( {
        where: {PetId: id, EventTypeId: eventTypeId}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Pet Events for PetId=" + id
            });
        });
};

// Find a single Pet Event with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    PetEvent.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error when retrieving Pet Event with EventId=" + id
            });
        });
};

// Update a single Pet Event identified by the request id
exports.update = (req, res) => {
    const id = req.params.id;
    PetEvent.update(req.body, {
        where: {PetEventId: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Pet Event was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pet Event with EventId=${id}. Maybe Event was not found or request body was empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pet Event with EventId=" + id
            });
        });
};

// Delete a single Pet Event with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    PetEvent.destroy({
        where: {EventId: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Pet Event was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pet Event with EventId=${id}. Maybe Event was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pet Event with EventId=" + id
            });
        });
};

