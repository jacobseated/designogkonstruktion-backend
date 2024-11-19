const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./app/model/User');

const app = express();
app.use(cors());

const db = require("./app/model/User");
db.sequelize.sync();

app.use(bodyParser.json());

// endpoints
require("./app/routes/user-route")(app);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});