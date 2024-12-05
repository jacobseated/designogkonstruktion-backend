const users = require("../controller/user.controller");  
const express = require("express");
const authenticate = require("../middleware/authenticate");

module.exports = app => {
    let router = express.Router();

    router.get('/users', users.findAll);
    router.get('/users/:user_id', users.findOne);

    router.post('/users', users.create);

    router.delete('/users/:user_id', authenticate, users.delete);
    
    router.patch('/users/:user_id', authenticate, users.update);

    app.use(router); 
};