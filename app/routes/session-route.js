const express = require("express");
const sessionController = require("../controller/session.controller");

module.exports = app => {
    let router = express.Router();

    // Example session endpoints
    router.post('/login', sessionController.login);
    router.post('/logout', sessionController.logout);

    app.use(router);
};