const session = require('express-session');
const db = require("../models");
const SessionStore = require("connect-session-sequelize")(session.Store);

// Configure Session Store
const sequelizeSessionStore = new SessionStore({
    db: db.sequelize,
    table: "Session"
});

module.exports = session({
    secret: "krazy pet key", // store something cryptic in env later
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',
    cookie: {
        //sameSite: true, // helps prevent CSRF attacks
        secure: false, // if true: only transmit cookie over https
        httpOnly: false, // if true: prevents client-side JS from reading the cookie.. set to false to access cookie in React
        maxAge: 1000 * 60 * 30 // session max age in milliseconds: 30 minutes
    }
});