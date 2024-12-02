const images = require("../controller/userImage.controller");  
const express = require("express");
const authenticate = require("../middleware/authenticate");

module.exports = app => {
    let router = express.Router();

    router.get('/images/:user_id', images.findOne);
    router.post('/images', authenticate, images.create);
    router.delete('/images/:user_id', authenticate, images.delete);
    router.patch('/images/:user_id', authenticate, images.update);

    app.use(router); 
};