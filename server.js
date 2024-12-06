const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./app/model"); // Inkluder alle database modellerne


const app = express();
app.use(cors({
  origin: "http://localhost:8080", // Replace with your frontend's URL
  credentials: true, // Allow cookies to be sent with requests
}));
app.use(cookieParser());

// Når vi køre "node server.js", så blier alting genoprettet
// Bemærk: kun imens vi udvikler. Når vi er færdige skal denne funktionalitet slåes fra ved at sætte MODE_EN=prod, så vi ikke mister data
// Opret automatisk tabellerne hvis de ikke findes brug "alter:true" hvis tabellerne ikke skal droppes
if (process.env.NODE_ENV === "development") {
  db.sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Database synchronized");

      // Define the SQL we need to execute when starting the server
      const createForumDeleteEvent = require("./app/db/event/deleteOldForumMessagesEvent"); // Vores database event til at slette gamle forum beskeder
      const baseDataSql = require("./app/db/SqlData/baseData"); // Inkluder vores grundlæggende data via SQL inserts

      // Opret vores event
      createForumDeleteEvent();
      // Indsæt grundlæggende data i tabellerne
      baseDataSql();
    })
    .catch((err) => {
      console.error("Failed to synchronize database:", err);
    });
}

app.use(bodyParser.json());

// endpoints
require("./app/routes/user-route")(app);
require("./app/routes/session-route")(app);
require("./app/routes/community-route")(app);
require("./app/routes/communityMembership-route")(app);
require("./app/routes/userImage-route")(app);
require("./app/routes/forum-route")(app);

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
