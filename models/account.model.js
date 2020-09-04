const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize) => {
    return sequelize.define("Account", {
        AccountId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        FirstName: {
            type: DataTypes.STRING(45)
        },
        LastName: {
            type: DataTypes.STRING(45)
        },
        Email: {
            type: DataTypes.STRING(45)
        },
        Password: {
            type: DataTypes.STRING(45)
        },
        AccountTypeId: {
            type: DataTypes.INTEGER
        }
    }, {
        // creates a model named Account, pointing to a table named Account
        freezeTableName: true,
        timestamps: false
    });
};