const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
            //require: true
    },
    name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 255
    },
    phone: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 11
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(11).required(),
        phone: Joi.string().min(5).max(11).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;