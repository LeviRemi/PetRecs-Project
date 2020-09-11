const bcrypt = require("bcrypt");
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
            type: DataTypes.STRING(45),
            unique: true,
            allowNull: false,
            isEmail: true
        },
        Password: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        AccountTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        // creates a model named Account, pointing to a table named Account
        freezeTableName: true,
        timestamps: false,

        // compares hashed input password to stored hashed password for login
        instanceMethods: {
            validPassword: function(password) {
                return bcrypt.compareSync(password, this.Password);
            }
        }
    });
};