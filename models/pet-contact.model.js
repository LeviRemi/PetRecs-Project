const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize) => {
    return sequelize.define("PetContact", {
        PetContactId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        AccountId: {
            type: DataTypes.INTEGER
        },
        PetId: {
            type: DataTypes.INTEGER
        }
    }, {
        // creates a model named PetContact, pointing to a table named PetContact
        freezeTableName: true,
        timestamps: false
    });
};