const petrecords = require("../controllers/pet-record.controller.js");

const router = require("express").Router();

// Root: "/api/pet-records"

// Add new pet record
router.post("/", petrecords.create);

// Retrieve all pet records for a specific Pet Id
router.get("/pet/:id", petrecords.findAll);

// Retrieve a single pet record with id
router.get("/:id", petrecords.findOne);

// Update a pet record with id
router.put("/:id", petrecords.update);

// Delete a pet record with id
router.delete("/:id", petrecords.delete);

module.exports = router;
