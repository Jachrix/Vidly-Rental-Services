const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password...');
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password...');
        const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
        res.send(token);

    } catch (err) {
        for (fields in err.errors) {
            console.log(err.errors[fields]);
        }
    }

});

// router.get('/:id', async(req, res) => {
//     const rental = await Rental.findById(req.params.id);

//     if (!rental) return res.status(404).send('The rental with the given ID was not found.');

//     res.send(rental);
// });

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;