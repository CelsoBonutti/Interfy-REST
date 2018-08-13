const mongoose = require('mongoose');
const currencyConvert = require('currency-convert');

let PaisSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    sigla: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 2
    },
    capital: {
        type: String,
        required: true
    },
    continente: {
        type: String,
        required: true
    },
    linguas: [{
        type: String,
        required: true
    }],
    moeda: {
        codigo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 3
        },
        nome: {
            type: String,
            required: true
        }
    },
    descricao: {
        type: String,
        required: true,
        maxlength: 100
    },
    vistos: [{
        nome: {
            type: String,
            required: true
        },
        dificuldade: {
            type: Number,
            min: 0,
            max: 5
        }
    }],
    clima: [{
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
                minima:{
                    type: Number,
                    required: true
                },
                maxima:{
                    type: Number,
                    required: true
                }
        }
    }],
    sugestao: {
        type: String,
        required: true
    }
})

PaisSchema.virtual('converteMoeda').get = function () {
    currencyConvert('BRL', this.moeda.codigo).then((valor) => {
        return valor;
    }).catch((err) => {
        return (err);
    })
}

let Pais = mongoose.model('Pais', PaisSchema);

module.exports = { Pais };