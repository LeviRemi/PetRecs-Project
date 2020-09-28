const medication = require("../controllers/medication.controller.js");

const router = require("express").Router();

// Root: "/api/medications"

// Create a new medication
router.post("/", medication.create);

// Retrieve all medications for a specific Pet Id
router.get("/pet/:id", medication.findAll);

// Retrieve a single medication with id
router.get("/:id", medication.findOne);

// Update a medication with id
router.put("/:id", medication.update);

// Delete a medication with id
router.delete("/:id", medication.delete);

module.exports = router;
