const breed = require("../controllers/breed.controller.js");

const router = require("express").Router();

// Root: "/api/breeds"

// Retrieve dog breeds
router.get("/dog", breed.findDogs);

// Retrieve cat breeds
router.get("/cat", breed.findCats);

// Get name of breed via id
router.get("/:id", breed.findOne);

module.exports = router;
