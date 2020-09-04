const petweights = require("../controllers/pet-weight.controller.js");

const router = require("express").Router();

// Create a new pet weight
router.post("/", petweights.create);

// Retrieve all pet weights for a specific Pet Id
router.get("/pet/:id", petweights.findAll);

// Retrieve a single pet weight with id
router.get("/:id", petweights.findOne);

// Update a pet weight with id
router.put("/:id", petweights.update);

// Delete a pet weight with id
router.delete("/:id", petweights.delete);

module.exports = router;
