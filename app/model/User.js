const { DataTypes } = require('sequelize'); // Henter "DataTypes" fra sequelize klassen
const sequelize = require('../db/sequelize'); // Inkluder database forbindelsen

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_fullname: DataTypes.STRING,
    user_mail: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true // Godkend kun gyldige e-mail adresser
        }
    },
    user_password: DataTypes.STRING(60),
    user_img: DataTypes.BLOB('long'),
    user_admin: Boolean
}, {
    tableName: 'users',
    // Opret automatisk tids-stempel kolonner (super smart)
    timestamps: true,
    createdAt: 'created_at', // Giv kolonnen et navn som passer med vores navngivning
    updatedAt: 'updated_at', // Giv kolonnen et navn som passer med vores navngivning
});

module.exports = User;