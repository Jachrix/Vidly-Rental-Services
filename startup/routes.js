const helmet = require('helmet');
const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const rentals = require('../routes/rentals');
const movies = require('../routes/movies');
const users = require('../routes/users');
const home = require('../routes/home');
const auth = require('../routes/auth');
const returns = require('../routes/returns');

const error = require('../middleware/error');


module.exports = function(app) {
    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use(express.static('public'));

    app.use(helmet());

    app.use('/api/genres', genres); // remove other route handler in genres with same path
    app.use('/api/customers', customers);
    app.use('/api/rentals', rentals);
    app.use('/api/movies', movies);
    app.use('/api/users', users);
    app.use('/', home);
    app.use('/api/auth', auth);
    app.use('/api/returns', returns);

    app.use(error);
    // app.use(function(err, req, res, next) {
    //     res.status(500).send('Something really went wrong ..!!!!');
    // });
}