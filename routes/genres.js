const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
//const Joi = require('joi');
const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const routerr = express.Router();

routerr.get('/', async(req, res, next) => {
    try {
        const genre = await Genre.find().sort('name');
        res.send(genre);
    } catch (ex) {
        next(ex);
    }

});

routerr.get('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    //const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send(`The genre with ID ${req.params.id} is not found!`)
    res.send(genre);
})

routerr.post('/', auth, async(req, res) => {

    //  const result = validateGenre(req.body);
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message)

    const genre = new Genre({ name: req.body.name });
    await genre.save();
    res.send(genre);

})

routerr.put('/:id', auth, async(req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message)
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send(`The genre with that ID wasnot found.`)

    // genre.name = req.body.name;
    res.send(genre);
});

routerr.delete('/:id', [auth, admin], async(req, res) => {
    // look up the course
    const genre = await Genre.findByIdAndRemove(req.params.id);
    //const genre = genres.find(c => c.id === parseInt(req.params.id));
    // Not existing return error
    if (!genre) return res.status(400).send(`The genre with ID ${req.params.id} not found`);
    //delete
    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);

    res.send(genre);
    // return same genre
})

module.exports = routerr;