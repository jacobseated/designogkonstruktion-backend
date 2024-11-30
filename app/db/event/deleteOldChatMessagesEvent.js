const sequelize = require('../sequelize');

// Denne kode bliver kaldt i server.js
// Det er vigtigt, fordi vores database-tabeller automatisk bliver oprettet af Sequelize når vi starter serveren
const deleteOldChatMessagesEvent = async () => {
    const eventSQL = `
    CREATE EVENT IF NOT EXISTS delete_old_chat_messages
    ON SCHEDULE EVERY 1 DAY
    STARTS CURRENT_TIMESTAMP
    DO
      BEGIN
        DELETE FROM chat WHERE message_created < NOW() - INTERVAL 3 MONTH;
      END
  `;

  // Kør koden og tjek om der var fejl
  try {
    await sequelize.query(eventSQL);
    console.log('Event created or already exists.');
  } catch (error) {
    console.error('Error creating event:', error);
  }
  };
  
  module.exports = deleteOldChatMessagesEvent;