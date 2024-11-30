const { DataTypes } = require("sequelize"); // Henter "DataTypes" fra sequelize klassen
const sequelize = require("../db/sequelize"); // Inkluder database forbindelsen

// Nedestående model bliver brugt af sequelize til automatisk at oprette vores User tabel
const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_fullname: DataTypes.STRING,
    user_mail: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true, // Godkend kun gyldige e-mail adresser
      },
    },
    // En bcrypt hashværdi er kun 60 tegn (bytes) lang
    user_password: DataTypes.STRING(60),
    
    user_img: DataTypes.BLOB("long"),
    user_admin: DataTypes.BOOLEAN,

    // Tidsstempel kolonner. Vi definere dem til:
    // - at være DATETIME
    // - ikke at tillade NULL værdier som input. Eks. Hvis nogen forsøger at indsætte NULL som værdi, opstår der en fejl
    // - NOW() skulle være default værdien. Dvs. Den indsætter automatisk et tidstempel for "nu", så vi slipper for at beregne det selv
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
    tableName: "user",
    // Opret automatisk tids-stempel kolonner (super smart, men virker vist ikke med default værdier, så vi gør det manuelt)
    timestamps: false, // Kan ikke bruges, da den ikke laver defaultværdier til felterne
  }
);

module.exports = User;