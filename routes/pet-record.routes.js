const petRecords = require("../controllers/pet-record.controller.js");

const router = require("express").Router();

// Root: "/api/pet-records"

// Add new pet record
router.post("/", petRecords.create);

// Retrieve all pet records for a specific Pet Id
router.get("/pet/:id", petRecords.findAll);

// Retrieve a single pet record with id
router.get("/:id", petRecords.findOne);

// Update a pet record with id
router.put("/:id", petRecords.update);

// Delete a pet record with id
router.delete("/:id", petRecords.delete);

module.exports = router;
