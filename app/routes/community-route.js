const communities = require("../controller/community.controller");  
const express = require("express");
const authenticate = require("../middleware/authenticate");

module.exports = app => {
    let router = express.Router();

    router.get('/communities/:community_id', communities.findOne);
    router.get('/communities', communities.findAll);
    router.post('/communities', communities.create);
    router.delete('/communities/:community_id', authenticate, communities.delete);
    // router.patch('/communities/:community_id', authenticate, communities.update);

    app.use(router); 
};