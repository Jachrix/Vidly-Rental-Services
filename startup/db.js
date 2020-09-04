//const express = require('express');
const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => winston.info('DB connections established....!!!'))

    //.catch(err => console.log('Error: ', err.message));
}