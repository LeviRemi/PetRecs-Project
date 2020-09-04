const pets = require("../controllers/pet.controller.js");

const router = require("express").Router();

// Create a new Pet
router.post("/", pets.create);

// Retrieve all Pets
router.get("/", pets.findAll);

// Retrieve a single Pet with id
router.get("/:id", pets.findOne);

// Update a pet with id
router.put("/:id", pets.update);

// Delete a pet with id
router.delete("/:id", pets.delete);

module.exports = router;
