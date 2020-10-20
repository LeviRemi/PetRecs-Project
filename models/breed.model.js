const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize) => {
    return sequelize.define("Breed", {
        BreedId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        SpeciesId: {
            type: DataTypes.INTEGER
        },
        BreedName: {
            type: DataTypes.STRING(45)
        }
    }, {
        // creates a model named Breed, pointing to a table named Breed
        freezeTableName: true,
        timestamps: false
    });
};