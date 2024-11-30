const { DataTypes } = require("sequelize"); // Henter "DataTypes" fra sequelize klassen
const sequelize = require("../db/sequelize"); // Inkluder database forbindelsen

// Nedestående model bliver brugt af sequelize til automatisk at oprette vores tabel i databasen
const userImage = sequelize.define(
  "userImage",
  {
    img_id: {
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
        onDelete: 'CASCADE'   // Hvis en chat bliver slettet, så slet også chatbeskederne
      },
    img_file: {
      type: DataTypes.STRING(255),
      unique: true
    },
  },
  {
    tableName: "user_image",
    timestamps: false,
  }
);

module.exports = userImage;