const accounts = require("../controllers/account.controller.js");

const router = require("express").Router();

// Root: "/api/accounts"

// Create a new Account
router.post("/", accounts.create);

// Retrieve all Accounts
router.get("/", accounts.findAll);

// Retrieve a single Account with id
router.get("/:id", accounts.findOne);

// Update an Account with id
router.put("/:id", accounts.update);

// Delete an Account with id
router.delete("/:id", accounts.delete);

module.exports = router;
