const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize) => {
    return sequelize.define("Pet", {
        PetId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        SpeciesId: {
            type: DataTypes.INTEGER,
        },
        BreedId: {
            type: DataTypes.INTEGER,
        },
        PetName: {
            type: DataTypes.STRING(45)
        },
        PetGender: {
            type: DataTypes.STRING(2)
        },
        PetAgeYear: {
            type: DataTypes.INTEGER
        },
        PetAgeMonth: {
            type: DataTypes.INTEGER
        },
        PetAgeDay: {
            type: DataTypes.INTEGER
        },
        AllergyNotes: {
            type: DataTypes.STRING(300)
        },
        FoodNotes: {
            type: DataTypes.STRING(300)
        },
        CareNotes: {
            type: DataTypes.STRING(300)
        }
    }, {
        // creates a model named Pet, pointing to a table named Pet
        freezeTableName: true,
        timestamps: false
    });
};