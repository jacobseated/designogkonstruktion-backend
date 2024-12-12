const { DataTypes } = require("sequelize"); // Henter "DataTypes" fra sequelize klassen
const sequelize = require("../db/sequelize"); // Inkluder database forbindelsen

// Nedestående model bliver brugt af sequelize til automatisk at oprette vores tabel i databasen
// Bemærk at vores user_image tabel her kun er tænkt som en overgangstabel, indtil vi overgår til at bruge filsystemet
// på serveren til opbevaring af billeder. Nedestående er derfor mest bevaret som eksempel på, hvordan vi helst bør undgå at opbevare billeder.
const userImage = sequelize.define(
  "userImage",
  {
    // Eftersom hver bruger kun har ét profilbillede, så lad os holde det simpelt ved at bruge user.user_id som identifikation
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'user_id',
      },
      onDelete: 'CASCADE',
    },
    user_image_data: {
      type: DataTypes.BLOB('long'),
    }
  },
  {
    tableName: "user_image",
    timestamps: false,
  }
);

module.exports = userImage;