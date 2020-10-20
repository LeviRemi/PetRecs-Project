const medications = require("../controllers/medication.controller.js");

const router = require("express").Router();

// Root: "/api/medications"

// Create a new medication
router.post("/", medications.create);

// Retrieve all medications for a specific Pet Id
router.get("/pet/:id", medications.findAll);

// Retrieve a single medication with id
router.get("/:id", medications.findOne);

// Update a medication with id
router.put("/:id", medications.update);

// Delete a medication with id
router.delete("/:id", medications.delete);

module.exports = router;
