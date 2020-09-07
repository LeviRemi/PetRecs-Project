const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize) => {
    return sequelize.define("PetEvent", {
        EventId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        EventTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        PetId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        EventDescription: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        Date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        // creates a model named PetEvent, pointing to a table named PetEvent
        freezeTableName: true,
        timestamps: false
    });
};