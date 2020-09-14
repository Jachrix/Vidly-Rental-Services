const moment = require('moment');
const auth = require('../middleware/auth');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
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
    rental.rentalFee = moment().diff(rental.dateOut, 'days') * rental.movie.dailyRentalRate;
    await rental.save();

    await Movie.update({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1 }
    });

    return res.status(200).send();

    //res.status(401).send('Unauthorized');

    // POST /api/returns ({customerId, movieId})

    // Return 401 if client is not logged in
    // Return 400 if customerId/movieId is not provided - 2 diff tests
    // Return 404 if no rental found for this customerId/movieId
    // Return 400 if the rental is already processed
    // Return 200 if valid request
    // set the return date
    // calculate the rental fee (no of days * dailyb rate)
    // Increase the stock
    // Return the rental
});

module.exports = router;