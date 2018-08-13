const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

let TurnoSchema = new mongoose.Schema({
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
                let { Instituicao } = require('./escola');
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
                let { Intensidade } = require('./intensidade');
                return Intensidade.exists(intensidade);
            },
            message: 'Intensidade inexistente'
        }
    }
})

let Turno = mongoose.model('Turno', TurnoSchema);

module.exports = { Turno };
