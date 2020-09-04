const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize) => {
    return sequelize.define("Species", {
        SpeciesId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        SpeciesName: {
            type: DataTypes.STRING(45)
        }
    }, {
        // creates a model named Species, pointing to a table named Species
        freezeTableName: true,
        timestamps: false
    });
};