const auth = require('../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already exists....');

        // user = new User({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password
        // });

        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        // res.send(user); sends all user details to the user
        // res.send({
        //     name: user.name,
        //     email: user.email
        // }); 

        // We can equally use the pick method in _ to select specific properties to send to user
        const token = user.generateAuthKey();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

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

module.exports = router;