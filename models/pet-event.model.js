const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize) => {
    return sequelize.define("PetEvent", {
        EventId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        EventTypeId: {
            type: DataTypes.INTEGER
        },
        PetId: {
            type: DataTypes.INTEGER
        },
        EventDescription: {
            type: DataTypes.STRING(300)
        },
        Date: {
            type: DataTypes.DATE
        }
    }, {
        // creates a model named PetEvent, pointing to a table named PetEvent
        freezeTableName: true,
        timestamps: false
    });
};