const db = require("../models");

exports.isAuthenticated = (req, res) => {
    if (!req.session.user) {
        res.status(401).send({
            message: "User is not authenticated."
        });
    } else {
        res.status(200).send( req.session.user );
    }
}

exports.destroySession = (req, res) => {
    req.session.destroy();
}