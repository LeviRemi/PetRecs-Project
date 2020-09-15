const db = require("../models");
const Account = db.account;
const bcrypt = require("bcrypt");
const sessionizeAccount = require("../util/helpers");

// Create and Save a new Account
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Email || !req.body.Password || !req.body.AccountTypeId) {
        res.status(400).send({
            message: "Error. Essential fields are empty."
        });
        return;
    }

    // Create Account
    const account = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: req.body.Password,
        AccountTypeId: req.body.AccountTypeId
    };

    // hash password before saving account to DB
    Account.beforeCreate((account) => {
        return bcrypt.hash(req.body.Password, 10)
            .then(hash => {
                account.Password = hash;
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while hashing the password"
                });
            });
    });

    // Save Account to database
    Account.create(account)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the account"
            });
        })
};

// Validate that account exists then grants user a session
exports.login = (req, res) => {
    // Validate request
    if (!req.body.Email || !req.body.Password) {
        res.status(400).send({
            message: "Error. Essential fields are empty."
        });
        return;
    }
    console.log("Validating...");
    const email = req.body.Email;
    const pass = req.body.Password;

    Account.findAll( {
        where: {Email: email}
    })
        .then(data => {
            // check to see if input password matches stored hash
            bcrypt.compare(pass, data[0].Password.toString()).then(function(result) {
                if (result) {
                    req.session.user = sessionizeAccount(data[0]);
                    res.status(200).send(req.session);
                } else {
                    res.status(400).send("Wrong email or password")
                }
            });

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while validating Account credentials"
            });
        });
}

// Retrieve all Accounts from the database
exports.findAll = (req, res) => {
    Account.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Accounts."
            });
        });
};

// Find a single Account with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Account.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error when retrieving Account with id=" + id
            });
        });
};

// Find a single Account with an email
exports.findOneByEmail = (req, res) => {
    const email = req.params.Email;
    Account.findAll( {
        where: {Email: email}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Account for Email=" + email
            });
        });
}

// Update a single Account identified by the request id
exports.update = (req, res) => {
    const id = req.params.id;
    Account.update(req.body, {
        where: {AccountId: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Account was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Account with id=${id}. Maybe Account was not found or request body was empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Account with id=" + id
            });
        });
};

// Delete a single Account with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    Account.destroy({
        where: {AccountId: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Account was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Account with id=${id}. Maybe Account was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Account with id=" + id
            });
        });
};

