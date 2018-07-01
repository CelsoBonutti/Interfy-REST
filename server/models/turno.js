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
            type: String,
            required: true,
            validate:{
                validator: function(valor){
                    return validator.isCurrency(valor);
                },
                message: '{VALUE} não é um valor válido'
            }
        },
        datas: [{
            type: Date,
            required: true,
        }]
    }],
    instituicao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instituicao',
        required: true
    },
    intensidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Intensidade',
        required: true
    }
})

var Turno = mongoose.model('Turno', TurnoSchema);

module.exports = { Turno };
