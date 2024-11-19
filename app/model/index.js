const sequelize = require('../db/sequelize');

const User = require('./User');

const db = {
    sequelize, 
    User       // Tilføj flere data modeller her
};

module.exports = db;