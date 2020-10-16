const pets = require("../controllers/pet.controller.js");

const router = require("express").Router();

// Root: "/api/pets"

// Create a new Pet
router.post("/", pets.create);

// Retrieve all Owned Pets for logged in user
router.get("/", pets.findAll);

// Retrieve all Shared Pets for logged in user
router.get("/shared", pets.findShared);

// Retrieve a single Pet with id
router.get("/:id", pets.findOne);

// Update a pet with id
router.put("/:id", pets.update);

// Delete a pet with id
router.delete("/:id", pets.delete);

// Share a pet with id (put email in JSON body)
router.post("/:id/share", pets.share);

// Check if current user is owner of pet
router.get("/:id/validate", pets.validate);

// Get all accounts that this pet is currently being shared with
router.get("/:id/getShared", pets.findSharedAccounts);

// Remove pet share from account
router.delete("/:id/share/:acct", pets.deleteSharedAccount);

module.exports = router;
