const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: DataTypes.STRING,
    user_mail: DataTypes.STRING,
    user_password: DataTypes.STRING,
    user_img: DataTypes.BLOB('long'),
    user_admin: DataTypes.TINYINT
}, {
    tableName: 'users',
    timestamps: false 
});

module.exports = User;