const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize) => {
    return sequelize.define("PetWeight", {
        PetWeightId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PetId: {
            type: DataTypes.INTEGER
        },
        Weight: {
            type: DataTypes.INTEGER
        },
        Date: {
            type: DataTypes.DATE
        }
    }, {
        // creates a model named PetWeight, pointing to a table named PetWeight
        freezeTableName: true,
        timestamps: false
    });
};