const winston = require('winston');
const startUpDebugger = require('debug')('app:startup');
const dataBaseDebugger = require('debug')('app:dataB');
//const config = require('config');
const morgan = require('morgan');
const logger = require('./middleware/logger');

const express = require('express');
const { response } = require('express');

const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('../startup/prod')(app);


app.set('view engine', 'pug');
//app.set('views', './views'); // optional

// console.log(`NODE_ENV is : ${process.env.NODE_ENV}`);
// console.log(app.get('env'));


//Environment
// if (app.get('env') === 'development') {
//     app.use(morgan('tiny'));
//     //console.log('Morgan enabled....');
//     startUpDebugger('Morgan enabled....');

// }

//Db Works
//dataBaseDebugger('Database connection ......');

// how to set to any environment
// On the cmd and in the dir run set NODE_ENV=name of env (production or development)

// Breakdown of an objectID representation in  mongodb

// _id: 5f48b5459be948da46a5f7c3 24- characters
// every two character rep a byte
// 12 bytes
// 4 bytes: timestamp
// 3 bytes: machine identifier
// 2 bytes: process identifier
// 3 bytes: counter

// genrating objectID

// const id = new mongoose.Types.ObjectId()
// console.log(id.getTimestamp());

//app.use(logger);

// creating custom middleware

// app.use(function(req, res, next) {
//     console.log('Authenticating......');
//     next();
// });

// Environment - Port
const port = process.env.port || 3000;

const server = app.listen(port, () => winston.info(`Listening on port ...... ${port}`));

module.exports = server;


// git init
// git add .
// git commit -m "first message"
// git branch -M master
// git remote add origin http:// address
// git push -u origin master

// git branch (branch name)
// git checkout -b (branch name)
// git checkout (branch name)