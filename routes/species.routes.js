const species = require("../controllers/species.controller.js");

const router = require("express").Router();

// Root: "/api/species"

// Retrieve all species
router.get("/", species.findAll);

// Get name of species via id
router.get("/:id", species.findOne);

module.exports = router;
