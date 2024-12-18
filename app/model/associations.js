const user = require("./user");
const community = require("./community");
const communityMembership = require("./communityMembership");
const forum = require("./forum");

// Her definere vi relationen mellem vores tabeller, som vist på vores ER diagram. Det gør, at vi kan udhente data fra linkede tabeller med sequelize (svarende til en JOIN i SQL)
// En bruger kan være medlem i flere communities relationen er — "many-to-many" eller "mange-til-mange" — relationen er skabt igennem vores junction tabel "community_membership"
// Vejledning: https://sequelize.org/docs/v7/associations/belongs-to-many/
user.belongsToMany(community, {
  // user . belongs-to-many (community) — håber forklaringen giver mening.
  through: communityMembership, // Modellen af junction tabellen som binder community sammen med user
  foreignKey: "user_id", // Foreign key i user tabellen
  otherKey: "community_id", // Foreign key i user tabellen
});

community.belongsToMany(user, {
  through: communityMembership, // Modellen af junction tabellen som binder community sammen med user
  foreignKey: "community_id", // Foreign key i "community_membership" tabellen
  otherKey: "user_id", // Foreign key i "community_membership" tabellen
});

// Definer en one-to-one relation fra forum til community tabellen
community.hasOne(forum, {
  foreignKey: "community_id",
  onDelete: "CASCADE", // Hvis community bliver sletter, så slettes de tilhørende forum beskeder
});

// Definer en one-to-many relation med forum tabellen fra community tabellen
community.hasMany(forum, { foreignKey: 'community_id' });

// For at udhente user.fullname via sequelize, så var det nødvendigt at definere relationen mellem forum og user tabellen
// En user kan have mange forum beskeder (one-to-many)
user.hasMany(forum, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
// Hver forum-besked tilhøre en bruger, så vi har en many-to-one relation
forum.belongsTo(user, {
  foreignKey: "user_id",
});

communityMembership.belongsTo(community, { foreignKey: "community_id" });

module.exports = {};
