const Joi = require('joi');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const express = require('express');
const router = express.Router();

router.post('/', [auth, validate(validateReturn)], async(req, res) => {
    // if (!req.body.customerId) return res.status(400).send('Customer ID not provided');
    // if (!req.body.movieId) return res.status(400).send('Movie ID not provided');

    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send(`Rental not found..`);

    if (rental.dateReturned) return res.status(400).send(`Already returned..`);

    rental.return();
    await rental.save();

    await Movie.update({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1 }
    });

    return res.status(200).send(rental);

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

function validateReturn(req) {
    const schema = {
        customerId: Joi.ObjectId().required(),
        movieId: Joi.ObjectId().required()
    }
    return Joi.validate(req, schema);
}

module.exports = router;