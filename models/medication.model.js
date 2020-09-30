const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize) => {
    return sequelize.define("Medication", {
        MedId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PetId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        DosageAmount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // tablet, tsp, shot, pill, gummy, etc.
        DosageUnit: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        StartDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        // if value exists for start, but null for end, then we can assume the medication length is indefinite
        EndDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        Notes: {
            type: DataTypes.STRING(300),
            allowNull: true
        }
    }, {
        // creates a model named Medication, pointing to a table named Medication
        freezeTableName: true,
        timestamps: false
    });
};