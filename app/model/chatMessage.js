const { DataTypes } = require("sequelize"); // Henter "DataTypes" fra sequelize klassen
const sequelize = require("../db/sequelize"); // Inkluder database forbindelsen

// Nedestående model bliver brugt af sequelize til automatisk at oprette vores User tabel
const chatMessage = sequelize.define(
  "chatMessage",
  {
    chat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chat_msg: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'user', // user tabellen
          key: 'user_id'  // Kolonnen i user_tabellen
      },
      onDelete: 'CASCADE'   // Hvis en bruger bliver slettet, så slet også chatbeskederne
    },
    // Giv tids-kolonnerne et navn som passer med vores navngivning, samt default værdi
    user_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "chat_message",
    // Opret automatisk tids-stempel kolonner (super smart, men virker vist ikke med default værdier, så vi gør det manuelt)
    timestamps: false, // Kan ikke bruges, da den ikke laver defaultværdier til felterne
  }
);

module.exports = chatMessage;