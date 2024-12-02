const sequelize = require("../sequelize");

// Denne kode bliver kaldt i server.js
// Bemærk: imens vi udvikler indeholder den også dummy data (vi fjerner dummy data inden deployment)

const baseDataSQL = {
  user: `
  INSERT INTO user (user_id, user_fullname, user_mail, user_password, user_admin, user_created, user_updated) VALUES
  (1, 'Ulla Hasen', 'ulla@example.com', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', 0, NOW(), NOW()),
  (2, 'Jonas', 'jon@vfl.dk', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', 1, NOW(), NOW()),
  (3, 'Jacob Kristensen', 'jac@vfl.dk', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', 1, NOW(), NOW()),
  (4, 'David', 'dav@vfl.dk', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', 1, NOW(), NOW()),
  (5, 'Martin', 'mac@vfl.dk', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', 1, NOW(), NOW()),
  (6, 'Eivind Johannes Goldenstein Hansen', 'eivind@example.com', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', 1, NOW(), NOW()),
  (7, 'Karen Elisabeth Johannesson', 'karen@example.com', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', 0, NOW(), NOW());`,
  community: `
INSERT INTO community (community_id, community_name) VALUES
(3, 'Fiskeklubben'),
(4, 'Lotusklubben'),
(1, 'Strikkeklubben'),
(2, 'Ølklubben');`,

  communityMembership: `
INSERT INTO community_membership (membership_id, user_id, community_id) VALUES
(1, 1, 1), -- Ulla Hansen (strikkeklubben)
(3, 1, 3), -- Ulla Hansen (fiskeklubben)
(7, 2, 4), -- Jonas (lotusklubben)
(12, 3, 2), -- Jacob (ølklubben)
(9, 3, 3), -- Jacob (fiskeklubben)
(8, 3, 4), -- Jacob (lotusklubben)
(6, 4, 4), -- David (lotusklubben)
(11, 5, 2), -- Martin (ølklubben)
(10, 5, 4), -- Martin (lotusklubben)
(13, 6, 2), -- Eivind (ølklubben)
(4, 6, 3), -- Eivind (fiskeklubben)
(5, 6, 4), -- Eivind (lotusklubben)
(2, 7, 1); -- Karen (strikkeklubben)
`,

  // Flere datasæts kan indsættes nedenfor
};

// Funktion til at indsætte vores dummy-data
/*const insertBaseDataSQL = async () => {
  try {
    for (const [table, query] of Object.entries(baseDataSQL)) {
      await sequelize.query(query); // Execute the insert query
      console.log(`Data inserted into ${table} successfully.`);
    }
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

// Eksporter funktionen, så vi kan kalde den fra server.js
module.exports = insertBaseDataSQL;*/
