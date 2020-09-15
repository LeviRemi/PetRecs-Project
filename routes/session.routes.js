const sessions = require("../controllers/session.controller");

const router = require("express").Router();

// Test if current user is authenticated (unused for now.. found other solution accessing cookie directly in React)
router.get("/", sessions.isAuthenticated);

router.get("/destroy", sessions.destroySession);


module.exports = router;