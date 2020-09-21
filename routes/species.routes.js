const species = require("../controllers/species.controller.js");

const router = require("express").Router();

// Root: "/api/species"

// Retrieve all species
router.get("/", species.findAll);

module.exports = router;
