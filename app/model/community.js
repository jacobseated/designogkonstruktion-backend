const { DataTypes } = require("sequelize"); // Henter "DataTypes" fra sequelize klassen
const sequelize = require("../db/sequelize"); // Inkluder database forbindelsen

// Nedestående model bliver brugt af sequelize til automatisk at oprette vores tabel i databasen
const community = sequelize.define(
  "community",
  {
    community_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    community_name: {
      type: DataTypes.STRING,
      unique: true
    },
  },
  {
    tableName: "community",
    timestamps: false,
  }
);

// Trigger for deleting chat messages when a community is deleted
// This command creates that trigger in the database
community.afterSync(async () => {
  await sequelize.query(`
    CREATE TRIGGER delete_category_messages
    AFTER DELETE ON community
    FOR EACH ROW 
    DELETE FROM chat WHERE community_id = OLD.community_id;
  `);
});

module.exports = community;
