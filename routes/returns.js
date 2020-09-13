const auth = require('../middleware/auth');
const { Rental } = require('../models/rental');
const express = require('express');
const router = express.Router();

router.post('/', auth, async(req, res) => {
    if (!req.body.customerId) return res.status(400).send('Customer ID not provided');
    if (!req.body.movieId) return res.status(400).send('Movie ID not provided');

    const rental = await Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId
    });

    if (!rental) return res.status(404).send(`Rental not found..`);

    if (rental.dateReturned) return res.status(400).send(`Already returned..`);

    rental.dateReturned = new Date(); // set to 1 to pass generic test
    rental.save();

    return res.status(200).send();

    //res.status(401).send('Unauthorized');
    // Return 200 if valid request
    // set the return date
});

module.exports = router;