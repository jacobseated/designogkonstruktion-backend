const { DataTypes } = require("sequelize"); // Henter "DataTypes" fra sequelize klassen
const sequelize = require("../db/sequelize"); // Inkluder database forbindelsen

// Nedestående model bliver brugt af sequelize til automatisk at oprette vores chat tabel
const Chat = sequelize.define(
  "chat",
  {
    chat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'user', // Navnet på tabellen
          key: 'user_id'  // Primary key Kolonnen i tabellen
      },
      onDelete: 'CASCADE'   // Hvis en bruger bliver slettet, så slet også deres chat beskeder
    },
    community_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'community', // Navnet på tabellen
          key: 'community_id'  // Primary key Kolonnen i tabellen
      },
      onDelete: 'CASCADE',   // Hvis et community bliver slettet, så slet også chatten
    },
    chat_message: DataTypes.STRING,

    // Tidsstempel kolonner. Vi definere dem til:
    // - at være DATETIME
    // - ikke at tillade NULL værdier som input. Eks. Hvis nogen forsøger at indsætte NULL som værdi, opstår der en fejl
    // - NOW() skulle være default værdien. Dvs. Den indsætter automatisk et tidstempel for "nu", så vi slipper for at beregne det selv
    message_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "chat",
    timestamps: false,
  }
);

module.exports = Chat;