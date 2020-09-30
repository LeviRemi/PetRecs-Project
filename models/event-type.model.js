const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize) => {
    return sequelize.define("EventType", {
        EventTypeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        EventTypeName: {
            type: DataTypes.STRING(45)
        }
    }, {
        // creates a model named EventType, pointing to a table named EventType
        freezeTableName: true,
        timestamps: false
    });
};