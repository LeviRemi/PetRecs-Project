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
        // creates a model named Species, pointing to a table named Species
        freezeTableName: true,
        timestamps: false
    });
};