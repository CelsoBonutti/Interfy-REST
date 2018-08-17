const mongoose = require('mongoose');
const validator = require('validator');

const VisaSchema = new mongoose.Schema({
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pais',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: validator.isCurrency,
            message: '{VALUE} não é um valor válido.'
        }
    }
})

const Visa = mongoose.model('Visa', VisaSchema);

module.exports = { Visa };