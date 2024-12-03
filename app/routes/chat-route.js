const chatMessages = require("../controller/chat.controller");  
const express = require("express");
const authenticate = require("../middleware/authenticate");

module.exports = app => {
    let router = express.Router();

    router.get('/chat/:community_id', authenticate, chatMessages.findAll);
    router.post('/chat', authenticate, chatMessages.create);

    app.use(router); 
};