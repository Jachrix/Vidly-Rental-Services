module.exports = function(err, req, resp, next) {
    // Log exceptions here...
    res.status(500).send('Something Failed....');
}