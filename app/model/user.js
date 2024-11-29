const { DataTypes } = require("sequelize"); // Henter "DataTypes" fra sequelize klassen
const sequelize = require("../db/sequelize"); // Inkluder database forbindelsen

// Nedestående model bliver brugt af sequelize til automatisk at oprette vores User tabel
const user = sequelize.define(
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
    tableName: "user",
    // Opret automatisk tids-stempel kolonner (super smart, men virker vist ikke med default værdier, så vi gør det manuelt)
    timestamps: false, // Kan ikke bruges, da den ikke laver defaultværdier til felterne
  }
);

// Definer en many-to-many (optional) relation til community tabellen
User.belongsToMany(Community, {
  through: "community_membership", // Definer en many-to-many (optional) relation mellem community og user
  foreignKey: "user_id", // Foreign key i user tabellen
  otherKey: "community_id", // Foreign key i user tabellen
});

module.exports = user;
