const sequelize = require('../db/sequelize'); // Inkluder database forbindelsen

// Inkluder data modellerne for vores tabeller i databasen
const user = require('./User');
const community = require('./community');
const communityMembership = require('./communityMembership');
const chat = require('./chat');
const chatMessage = require('./chatMessage');
const userImage = require('./userImage');

const db = {
    sequelize, 
    user,
    community,
    communityMembership,
    chat,
    chatMessage,
    userImage       // Tilføj flere data modeller her
};

module.exports = db;