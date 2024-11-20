const { DataTypes } = require('sequelize'); // Henter "DataTypes" fra sequelize klassen
const sequelize = require('../db/sequelize'); // Inkluder database forbindelsen

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            is: /^[a-zæøå0-9]+$/i // Tillad kun a-z + æøå og 1-9 i brugernavne
        }
    },
    user_mail: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true // Godkend kun gyldige e-mail adresser
        }
    },
    user_password: DataTypes.STRING,
    user_img: DataTypes.BLOB('long'),
    user_admin: DataTypes.TINYINT
}, {
    tableName: 'users',
    timestamps: false 
});

module.exports = User;