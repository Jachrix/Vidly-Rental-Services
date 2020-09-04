const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    // process.on('uncaughtException', (ex) => {
    //     console.log('WE GOT AN UNCAUGHT EXCEPTION...');
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });

    winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    process.on('unhandledRejection', (ex) => {
        throw ex;
        // console.log('WE GOT AN UNHANDLED REJECTION...');
        // winston.error(ex.message, ex);
        // process.exit(1);
    });


    //winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' });

    //throw new Error('Something failed during startup.....');
    // const P = Promise.reject(new Error('Something failed completely....'));
    // P.then(() => console.log('Done'));

}