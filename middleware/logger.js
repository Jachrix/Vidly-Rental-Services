function logg(req, res, next) {
    console.log('Logging......');
    next();
}

module.exports = logg;