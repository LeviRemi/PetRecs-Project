const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize) => {
    return sequelize.define("PetRecord", {
        PetRecordId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PetId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        RecordName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        RecordUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FileName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UploadDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        // creates a model named PetRecord, pointing to a table named PetRecord
        freezeTableName: true,
        timestamps: false
    });
};