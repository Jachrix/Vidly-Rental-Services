require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const startUpDebugger = require('debug')('app:startup');
const dataBaseDebugger = require('debug')('app:dataB');
//const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const movies = require('./routes/movies');
const users = require('./routes/users');
const home = require('./routes/home');
const auth = require('./routes/auth');
const express = require('express');
const { response } = require('express');

const app = express();

//winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' });

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined....');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('DB connections established.....'))
    .catch(err => console.log('Error: ', err.message));

app.set('view engine', 'pug');
//app.set('views', './views'); // optional

// console.log(`NODE_ENV is : ${process.env.NODE_ENV}`);
// console.log(app.get('env'));

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

app.use(error);

// app.use(function(err, req, res, next) {
//     res.status(500).send('Something really went wrong ..!!!!');
// });

// Configuration
// console.log('Application Name:' + config.get('name'));
// console.log('Mail Server:' + config.get('mail.host'));
// console.log('Mail Password:' + config.get('mail.password'));


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

app.listen(port, () => console.log(`Listening on port ...... ${port}`));


// git init
// git add .
// git commit -m "first message"
// git branch -M master
// git remote add origin http:// address
// git push -u origin master

// git branch (branch name)
// git checkout -b (branch name)
// git checkout (branch name)