const express = require('express');

const routerr = express.Router();

// localhost:3000 Templating Engines

routerr.get('/', (req, res) => {
    res.render('index', { title: "My Express App", message: "Welcome Jachrix" });
});


module.exports = routerr;