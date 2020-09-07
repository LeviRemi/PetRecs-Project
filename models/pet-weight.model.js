const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize) => {
    return sequelize.define("PetWeight", {
        PetWeightId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PetId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: true
        },
        Date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        // creates a model named PetWeight, pointing to a table named PetWeight
        freezeTableName: true,
        timestamps: false
    });
};