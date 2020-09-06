const petEvents = require("../controllers/pet-event.controller.js");

const router = require("express").Router();

// Root: "/api/pet-events"

// Create a new pet event
router.post("/", petEvents.create);

// Retrieve all pet events for a specific PetId
router.get("/pet/:id", petEvents.findAll);

// Retrieve all pet events of a specified EventType for a specific PetId
router.get("/pet/:id/:EventTypeId", petEvents.findAllOfType);

// Retrieve a single pet event with EventId
router.get("/:id", petEvents.findOne);

// Update a pet event with EventId
router.put("/:id", petEvents.update);

// Delete a pet event with EventId
router.delete("/:id", petEvents.delete);

module.exports = router;
