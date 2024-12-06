const { DataTypes } = require("sequelize"); // Henter "DataTypes" fra sequelize klassen
const sequelize = require("../db/sequelize"); // Inkluder database forbindelsen

// Nedestående model bliver brugt af sequelize til automatisk at oprette vores tabel i databasen
const CommunityMembership = sequelize.define(
  "communityMembership",
  {
    membership_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'user', // Navnet på user tabellen
          key: 'user_id'  // Kolonnen i user tabellen
      },
      onDelete: 'CASCADE'   // Hvis et forum bliver slettet, så slet også forum beskederne med den bruger
    },
    community_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'community', // Navnet på user tabellen
          key: 'community_id'  // Kolonnen i user tabellen
      },
      onDelete: 'CASCADE'   // Hvis et forum bliver slettet, så slet også forum beskederne
    },
  },
  {
    tableName: "community_membership",
    timestamps: false, // Kan ikke bruges, da den ikke laver defaultværdier til felterne
  }
);

module.exports = CommunityMembership;
