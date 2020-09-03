module.exports = function(err, req, res, next) {
    // Log exceptions here...
    res.status(500).send('Again, Something Failed....');
}