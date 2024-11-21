const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./app/model/User');

const app = express();
app.use(cors());

const db = require("./app/model");
db.sequelize.sync({ alter: true }) // Opret automatisk tabellerne hvis de ikke findes
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Failed to synchronize database:', err);
  });

app.use(bodyParser.json());

// endpoints
require("./app/routes/user-route")(app);
require("./app/routes/session-route")(app);

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});