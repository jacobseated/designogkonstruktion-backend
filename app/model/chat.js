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

// Create the event for deleting 3-month-old chat messages
// This command creates that event in the database
// It will delete chat messages older than 3 months
chat.afterSync(async () => {
  await sequelize.query(`
    CREATE EVENT IF NOT EXISTS \`Delete 3 month old chat\`
    ON SCHEDULE EVERY 1 DAY
    STARTS '2024-11-29 00:00:00'
    ENDS '2030-12-31 23:59:59'
    ON COMPLETION PRESERVE
    ENABLE
    COMMENT 'Command deletes 3 month old messages.'
    DO DELETE FROM chat WHERE message_created < NOW() - INTERVAL 3 MONTH;
  `);
});

module.exports = chat;
