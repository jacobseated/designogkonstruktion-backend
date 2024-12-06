const express = require("express");
const fs = require('fs');
const https = require('https');
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./app/model"); // Inkluder alle database modellerne

let allowedOrigin ; // , "https://wriggleflap.beamtic.net"

if (process.env.NODE_ENV === "production") {
  allowedOrigin = "https://wriggleflap.beamtic.net";
} else {
  allowedOrigin = "http://localhost:8080";
}

const app = express();
app.use(cors({
  origin: allowedOrigin, // Replace with your frontend's URL
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
      const createChatDeleteEvent = require("./app/db/event/deleteOldChatMessagesEvent"); // Vores database event til at slette gamle chatbeskeder
      const baseDataSql = require("./app/db/SqlData/baseData"); // Inkluder vores grundlæggende data via SQL inserts

      // Opret vores event
      createChatDeleteEvent();
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


// Brug env variabler så man nemt kan skifte port i tilfælde af konflikter
const PORT = process.env.PORT || 8081;
const HOST = process.env.HOST || '127.0.0.1';

// Hvis vi køre på production, så brug HTTPS, ellers antager vi, at serveren bliver kørt i et udviklingsmiljø
if (process.env.NODE_ENV === "production") {
  // If we run in production, make sure to include the certificates to secure communication with frontends
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/wriggleflap.beamtic.net/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/wriggleflap.beamtic.net/fullchain.pem')
  };

  https.createServer(options, app).listen(PORT, HOST, () => {
    console.log(`Server is running securely at https://${HOST}:${PORT}`);
  });
} else {
  
  app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
}
