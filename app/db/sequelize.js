require('dotenv').config(); // Indlæs miljø-variabler (.env environment variabler)

// Inkludere kun Sequelize (Eks. ikke Sequelize.DataTypes)
// Se eks model/User.js hvor DataTypes bliver inkluderet
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: process.env.DB_SSL === 'true' ? { ssl: true } : {},
});

module.exports = sequelize;