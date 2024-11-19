const users = require("../controller/user.controller");  
const express = require("express");

module.exports = app => {
    let router = express.Router();

    router.get('/users', users.findAll);
    router.post('/users', users.create);

    app.use(router); 
};