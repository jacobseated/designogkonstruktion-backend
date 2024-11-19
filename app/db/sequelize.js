const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mariadb',
    dialectOptions: {
        ssl: true
    },
    logging: false
});

module.exports = sequelize;