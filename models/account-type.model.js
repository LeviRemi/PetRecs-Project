const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize) => {
    return sequelize.define("AccountType", {
        AccountTypeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        TypeName: {
            type: DataTypes.STRING(45)
        }
    }, {
        // creates a model named AccountType, pointing to a table named AccountType
        freezeTableName: true,
        timestamps: false
    });
};