const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const currencyConvert = require('currency-convert');

var PaisSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    capital: {
        type: String,
        required: true
    },
    continente: {
        type: String,
        required: true
    },
    linguas: {
        type: [String],
        required: true
    },
    moeda: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 3
    },
    descricao: {
        type: String,
        required: true,
        maxlength: 100
    },
    vistos: {
        type: [{
            nome: {
                type: String,
                required: true
            },
            dificuldade: {
                type: Number,
                min: 0,
                max: 5
            }
        }]
    },
    clima: [{
        estacoes: [{
            nome: {
                type: String,
                required: true
            },
            temporada: {
                type: String,
                required: true
            },
            meses: {
                type: String,
                required: true
            },
            tempo: {
                type: String,
                required: true
            },
            temperatura: {
                type: [Number],
                required: true
            }
        }]
    }],
    sugestao: {
        type: String,
        required: true
    }
})

PaisSchema.methods.converteMoeda = function () {
    currencyConvert('BRL', this.moeda).then((valor) => {
        return valor;
    }).catch((err) => {
        console.log(err);
    })
}