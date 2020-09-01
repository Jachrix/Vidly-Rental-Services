const auth = require('../middleware/auth');
//const Joi = require('joi');
const { Customer, validate } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const routerr = express.Router();

routerr.get('/', async(req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);
});

routerr.get('/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    //const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!customer) return res.status(400).send(`The customer with ID ${req.params.id} is not found!`)
    res.send(customer);
})

routerr.post('/', auth, async(req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    try {
        const customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        });
        await customer.save();
        res.send(customer);
    } catch (err) {
        for (field in err.errors) {
            console.error(err.errors[field]);
        }
    }
})

routerr.put('/:id', auth, async(req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message)
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(400).send(`The customer with that ID wasnot found.`)

    // customer.name = req.body.name;
    res.send(customer);
});

routerr.delete('/:id', auth, async(req, res) => {
    // look up the course
    const customer = await Customer.findByIdAndRemove(req.params.id);
    //const genre = genres.find(c => c.id === parseInt(req.params.id));
    // Not existing return error
    if (!customer) return res.status(400).send(`The genre with ID ${req.params.id} not found`);
    //delete
    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);

    res.send(customer);
    // return same genre
})

module.exports = routerr;