const memberships = require("../controller/communityMembership.controller");  
const express = require("express");
const authenticate = require("../middleware/authenticate");

module.exports = app => {
    let router = express.Router();

    router.get('/memberships/:user_id', authenticate, memberships.findAll);
    router.post('/memberships', authenticate, memberships.create);
    router.delete('/memberships/:user_id/:community_id', authenticate, memberships.delete);

    app.use(router); 
};