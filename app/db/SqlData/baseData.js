const sequelize = require("../sequelize");

// Denne kode bliver kaldt i server.js
// Bemærk: imens vi udvikler indeholder kan den også indeholde dummy data (vi bør fjerne dummy data inden deployment)

const baseDataSQL = {
  user: `
  INSERT INTO user (user_id, user_fullname, user_mail, user_password, user_admin, user_created, user_updated) VALUES
  (1, 'Jonas', 'jon@vfl.dk', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', 1, NOW(), NOW()),
  (2, 'Jacob Kristensen', 'jac@vfl.dk', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', 1, NOW(), NOW()),
  (3, 'David', 'dav@vfl.dk', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', 1, NOW(), NOW()),
  (4, 'Martin', 'mar@vfl.dk', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', 1, NOW(), NOW());`,
  community: `
INSERT INTO community (community_id, community_name) VALUES
(1, 'Fiskeklubben'),
(2, 'Lotusklubben'),
(3, 'Ølklubben');`,
/*
  // Vi har ikke længere brug for det her dummy-data, men lad det være udkommenteret, bare som eksempel
  forum: `
INSERT INTO forum (forum_id, user_id, community_id, forum_message, message_created) VALUES
(2, 2, 2, 'Test message 52', '2024-08-30 14:32:00'),
(3, 3, 3, 'Test message 53', '2024-08-31 14:32:00'),
(4, 4, 1, 'Test message 54', '2024-09-01 14:32:00'),
(5, 5, 2, 'Test message 55', '2024-09-02 14:32:00'),
(6, 6, 3, 'Test message 56', '2024-09-03 14:32:00'),
(12, 6, 3, 'Test message 12', '2024-09-05 22:00:00'),
(13, 1, 1, 'Test message 13', '2024-09-15 10:30:00'),
(15, 3, 3, 'Test message 15', '2024-10-01 11:45:00'),
(16, 4, 1, 'Test message 16', '2024-10-10 13:50:00'),
(18, 6, 3, 'Test message 18', '2024-10-25 09:00:00'),
(19, 1, 1, 'Test message 19', '2024-11-01 18:45:00'),
(21, 3, 3, 'Test message 21', '2024-11-10 10:00:00'),
(22, 4, 1, 'Test message 22', '2024-11-15 19:20:00'),
(24, 6, 3, 'Test message 24', '2024-11-25 21:00:00'),
(25, 1, 1, 'Test message 25', '2024-11-27 12:00:00'),
(27, 3, 3, 'Test message 27', '2024-11-24 08:50:00'),
(28, 4, 1, 'Test message 28', '2024-11-22 13:10:00'),
(30, 6, 3, 'Test message 30', '2024-11-16 11:00:00'),
(31, 1, 1, 'Test message 31', '2024-11-14 08:30:00'),
(33, 3, 3, 'Test message 33', '2024-11-08 10:20:00'),
(34, 4, 1, 'Test message 34', '2024-11-06 13:50:00'),
(36, 6, 3, 'Test message 36', '2024-11-02 20:25:00'),
(37, 1, 1, 'Test message 37', '2024-10-29 09:45:00'),
(39, 3, 3, 'Test message 39', '2024-10-23 11:30:00'),
(40, 7, 1, 'Altså, jeg forstår simpelthen ikke denne opskrift! Har tre gange pillet det op nu, og det ligner stadig alt andet end en sweater. Måske er det min hjerne eller opskriften, men noget går HELT galt her!', '2024-11-20 18:42:00'),
(41, 1, 1, 'Helt ærligt, Karen! Hvis du nu bare fulgte opskriften ORDENTLIGT og ikke fumlede rundt hele tiden, så var du nok færdig nu! Det er altså ikke opskriftens skyld, hvis man ikke læser den ordentligt!', '2024-11-20 18:49:00'),
(42, 7, 1, 'Jamen altså, Ulla, det er jo lige netop dét! Din håndskrift er som hieroglyffer – ingen kan læse det! Hvis du skrev tydeligt, ville jeg ikke sidde her og bakse med noget, der ligner en strikket kludedukke!', '2024-11-20 18:55:00'),
(43, 4, 1, 'STOP så begge to! Denne opførsel hører ingen steder hjemme her i gruppen. Jeg forventer, at I viser respekt for hinanden og holder en ordentlig tone. Én gang til, og I bliver begge bandlyst fra det her forum! Få det nu løst som voksne mennesker.', '2024-11-20 19:00:00')
`, */

  communityMembership: `
INSERT INTO community_membership (user_id, community_id) VALUES
(1, 2), -- Jonas (lotusklubben)
(2, 3), -- Jacob (ølklubben)
(2, 1), -- Jacob (fiskeklubben)
(2, 2), -- Jacob (lotusklubben)
(3, 2), -- David (lotusklubben)
(4, 3), -- Martin (ølklubben)
(4, 2); -- Martin (lotusklubben)
`,

  // Flere datasæts kan indsættes nedenfor
};

// Funktion til at indsætte vores start-data
// MÅ IKKE UDKOMMENTERES: Udkommenter "NODE_ENV=development" i jeres .env fil, hvis I vil undgå at genoprette tabeller.
const insertBaseDataSQL = async () => {
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
module.exports = insertBaseDataSQL;