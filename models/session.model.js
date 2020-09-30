const { DataTypes } = require("sequelize"); // Import the built-in data types

// Sessions are automatically destroyed after their expiration date is reached
module.exports = (sequelize) => {
    return sequelize.define("Session", {
        sid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        userId: DataTypes.STRING,
        expires: DataTypes.DATE,
        data: DataTypes.STRING(50000),
    }, {
        // creates a model named Session, pointing to a table named Session
        freezeTableName: true,
        timestamps: false
    });
};