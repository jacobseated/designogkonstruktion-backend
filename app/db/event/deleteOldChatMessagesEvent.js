const sequelize = require('../sequelize');

// Denne kode bliver kaldt i server.js
// Det er vigtigt, fordi vores database-tabeller automatisk bliver oprettet af Sequelize når vi starter serveren
const deleteOldForumMessagesEvent = async () => {
    const eventSQL = `
    CREATE EVENT IF NOT EXISTS delete_old_forum_messages
    ON SCHEDULE EVERY 1 DAY
    STARTS '2024-11-29 00:00:00'
    ENDS '2030-12-31 23:59:59'
    ON COMPLETION PRESERVE
    ENABLE
    COMMENT 'Command deletes 3 month old messages.'
    DO DELETE FROM forum WHERE message_created < NOW() - INTERVAL 3 MONTH;
  `;

  // Kør koden og tjek om der var fejl
  try {
    await sequelize.query(eventSQL);
    console.log('Event created or already exists.');
  } catch (error) {
    console.error('Error creating event:', error);
  }
  };
  
  module.exports = deleteOldForumMessagesEvent;