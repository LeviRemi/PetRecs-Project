const accounts = require("../controllers/account.controller.js");

const router = require("express").Router();

// Root: "/api/accounts"

// Create a new Account
router.post("/", accounts.create);

// Login to an existing Account
router.post("/login", accounts.validate);

// Retrieve all Accounts
router.get("/", accounts.findAll);

// Retrieve a single Account via id
router.get("/:id", accounts.findOne);

// Retrieve a single Account via email
router.get("/email/:Email", accounts.findOneByEmail);

// Update an Account with id
router.put("/:id", accounts.update);

// Delete an Account with id
router.delete("/:id", accounts.delete);

module.exports = router;
