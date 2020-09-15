const { DataTypes } = require("sequelize"); // Import the built-in data types

module.exports = (sequelize) => {
    return sequelize.define("Pet", {
        PetId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        AccountId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        SpeciesId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        BreedId: {
            type: DataTypes.INTEGER
        },
        PetName: {
            type: DataTypes.STRING(45),
            allowNull: false
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