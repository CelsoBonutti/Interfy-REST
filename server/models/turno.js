const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var TurnoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    duracao: [{
        numeroSemanas: {
            type: Number,
            required: true
        },
        valor: {
            type: Number,
            required: true,
            validate: {
                validator: validator.isCurrency,
                message: '{VALUE} não é um preço válido.'
            }
        },
        datas: [{
            type: Date,
            required: true,
        }]
    }]
})

var Turno = mongoose.model('Turno', TurnoSchema);

module.exports = { Turno };
