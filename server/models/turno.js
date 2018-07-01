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
        required: true,
        validate:{
            validator: function(instituicao){
                var { Instituicao } = require('./ies');
                return Instituicao.exists(instituicao);
            },
            message: 'A escola que está tentando ser registrada não existe.'
        }
    },
    intensidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Intensidade',
        required: true,
        validate:{
            validator: function(intensidade){
                var { Intensidade } = require('./intensidade');
                return Intensidade.exists(intensidade);
            },
            message: 'Intensidade inexistente'
        }
    }
})

var Turno = mongoose.model('Turno', TurnoSchema);

module.exports = { Turno };
