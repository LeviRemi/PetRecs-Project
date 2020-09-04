const dbConfig = require("../config/db.config.js");

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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pet = require("./pet.model.js")(sequelize, Sequelize);
db.species = require("./species.model")(sequelize, Sequelize);
db.breed = require("./breed.model")(sequelize, Sequelize);
db.account = require("./account.model")(sequelize, Sequelize);
db.petweight = require("./pet-weight.model")(sequelize, Sequelize);

module.exports = db;