const sequelize = require('../db/sequelize'); // Inkluder database forbindelsen

const user = require('./user'); // Inkluder "User" modellen, som beskriver "users" tabellen i databasen

const db = {
    sequelize, 
    user       // Tilføj flere data modeller her
};

module.exports = db;