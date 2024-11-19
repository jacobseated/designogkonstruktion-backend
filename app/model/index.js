const sequelize = require('../db/sequelize'); // Inkluder database forbindelsen

const User = require('./User'); // Inkluder "User" modellen, som beskriver "users" tabellen i databasen

const db = {
    sequelize, 
    User       // Tilføj flere data modeller her
};

module.exports = db;