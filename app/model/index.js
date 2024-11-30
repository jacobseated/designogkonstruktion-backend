const sequelize = require('../db/sequelize'); // Inkluder database forbindelsen


// Inkluder data modellerne til vores ORM (Object-Relational Mapping)
// Sagt med almindeligt Dansk, så repræsentere modellerne tabellerne i vores database
// Sequelize bruger dem til, automatisk at oprette og opdatere database layout, samt at foretage JOINs mellem tabellerne
// uden at vi selv behøver skrive SQL koden til det.
const user = require('./user'); // Tabellen til brugere
const community = require('./community'); // Tabellen til Fællesskaber
const communityMembership = require('./communityMembership'); // Tabellen til fællesskabs-medlemskab (Junction Tabel: binder user og community sammen)
const chat = require('./chat'); // Chat tabellen

// Definer database associations (Ligesom på ER diagrammet)
require('./associations');

const db = {
    sequelize, 
    user, // one-to-one relation med community
    community,
    communityMembership,
    chat,
    // Fjernede user_image indtil videre
    // Tilføj flere data modeller her
};

module.exports = db;