const { DataTypes } = require("sequelize"); // Henter "DataTypes" fra sequelize klassen
const sequelize = require("../db/sequelize"); // Inkluder database forbindelsen

// Nedestående model bliver brugt af sequelize til automatisk at oprette vores chat tabel
const chat = sequelize.define(
  "chat",
  {
    chat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    community_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'community', // Navnet på community tabellen
          key: 'community_id'  // Kolonnen i community tabellen
      },
      onDelete: 'CASCADE'   // Hvis et community bliver slettet, så slet også chatten
    },
  },
  {
    tableName: "chat",
    timestamps: false,
  }
);

module.exports = chat;
