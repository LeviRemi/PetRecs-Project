const express = require('express');
const cors = require("cors");
const path = require('path');
const authenticate = require('./middleware/authenticate');
const session = require("./middleware/session");
const routes = require("./routes/index");

const app = express();

const corsOptions = {
    origin: (process.env.NODE_ENV === "production")? "https://petrecs.herokuapp.com/" : "http://localhost:3000",
    credentials: true
};
app.use(cors(corsOptions));

// Makes it difficult for users to see app is running express. Helps against targeted attacks.
app.disable('x-powered-by');

// Express middleware that allows POSTing data
// -parse requests of content-type - application/json
app.use(express.json());
// -parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

// if app is running behind a proxy
//app.set('trust proxy', 1);

// Configure Session
app.use(session);

// Check if user is authenticated or not
app.use(authenticate);

// API Routes
app.use(routes);

if (process.env.NODE_ENV === "production") {
    // Serve the static files from the React app
    app.use(express.static(path.join(__dirname,'client', 'build')));
    
    app.get("/*", (req, res) => {
        res.sendFile(path.join('client','build', 'index.html'), {root: __dirname});
    })
}

const PORT = process.env.PORT || 5000;

// Create the tables if they do not exist
db.sequelize.sync().then(() => {
    // Only start the server if a connection to the DB has been made
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}.`);
    })
})