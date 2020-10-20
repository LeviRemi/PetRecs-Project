const dbConfig = require("../config/db.config.js");

// Connect sequelize to the database server
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// Construct a database object containing all models
// Exported to be used by the controllers and server
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pet = require("./pet.model.js")(sequelize, Sequelize);
db.species = require("./species.model")(sequelize, Sequelize);
db.breed = require("./breed.model")(sequelize, Sequelize);
db.account = require("./account.model")(sequelize, Sequelize);
db.petWeight = require("./pet-weight.model")(sequelize, Sequelize);
db.petEvent = require("./pet-event.model")(sequelize, Sequelize);
db.petRecord = require("./pet-record.model")(sequelize, Sequelize);
db.petContact = require("./pet-contact.model")(sequelize, Sequelize);
db.eventType = require("./event-type.model")(sequelize, Sequelize);
db.accountType = require("./account-type.model")(sequelize, Sequelize);
db.session = require("./session.model")(sequelize, Sequelize);
db.medication = require("./medication.model")(sequelize, Sequelize);

module.exports = db;