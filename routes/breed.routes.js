const breeds = require("../controllers/breed.controller.js");

const router = require("express").Router();

// Root: "/api/breeds"

// Retrieve dog breeds
router.get("/dog", breeds.findDogs);

// Retrieve cat breeds
router.get("/cat", breeds.findCats);

// Get name of breed via id
router.get("/:id", breeds.findOne);

module.exports = router;