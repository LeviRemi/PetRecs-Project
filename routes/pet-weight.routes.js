const petWeights = require("../controllers/pet-weight.controller.js");

const router = require("express").Router();

// Root: "/api/pet-weights"

// Create a new pet weight
router.post("/", petWeights.create);

// Retrieve all pet weights for a specific Pet Id
router.get("/pet/:id", petWeights.findAll);

// Retrieve a single pet weight with id
router.get("/:id", petWeights.findOne);

// Update a pet weight with id
router.put("/:id", petWeights.update);

// Delete a pet weight with id
router.delete("/:id", petWeights.delete);

module.exports = router;
