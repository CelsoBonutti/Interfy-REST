const mongoose = require('mongoose');
const validator = require('validator'); 
const moment = require('moment');
const _ = require('lodash');

var DiferencialSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    icone: {
        type: String,
        validate:{
            validator: validator.isURL,
            message: '{VALUE} não é uma URL válida'
        }
    },
    valor:{
        type: Number,
        required: true,
        validate: {
            validator: validator.isCurrency,
            message: '{VALUE} não é um valor válido.'
        }
    }
})