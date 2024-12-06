const forumMessages = require("../controller/forum.controller");  
const express = require("express");
const authenticate = require("../middleware/authenticate");

module.exports = app => {
    let router = express.Router();

    router.get('/forum/:community_id', authenticate, forumMessages.findAll);
    router.post('/forum/:community_id', authenticate, forumMessages.create);

    app.use(router); 
};