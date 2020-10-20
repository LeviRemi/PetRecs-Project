const firebase = require("../controllers/firebase.controller.js");
const multer = require('multer' );
const router = require("express").Router();

// Initiating a memory storage engine to store files as Buffer objects
const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
    },
});

// Root: "/api/upload"

// Upload File
router.post("/", uploader.single('image'), firebase.upload);
router.post("/record", uploader.single('file'), firebase.upload);
router.post("/delete", firebase.delete);

module.exports = router;