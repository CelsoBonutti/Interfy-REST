const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var InformacoesSchema = new mongoose.Schema({
    dataNascimento: {
        type: Date,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    nivel: {
        type: String,
        required: true
    },
    endereco: {
        cep: {
            type: Number,
            required: true,
            minlength: 8,
            maxlength: 8
        },
        estado: {
            type: String,
            required: true
        },
        cidade: {
            type: String,
            required: true
        },
        bairro: {
            type: String,
            required: true
        },
        rua: {
            type: String,
            required: true
        },
        numero: {
            type: Number,
            required: true
        },
        complemento: {
            type: String,
            required: false
        }
    },
    informacoesMedicas: {
        condicaoEspecial: {
            type: String,
            required: false
        },
        restricaoAlimentar: {
            type: String,
            required: false
        },
        adicional: {
            type: String,
            required: false
        }
    },
    contatosSeguranca: [{
        nome: String,
        parentesco: String,
        telefone: Number
    }],
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    }
})

InformacoesSchema.statics.findByUserId = function (_userId) {
    var Informacoes = this;

    return Informacoes.findOne({_userId}).then((informacoes) => {
        if(!informacoes){
            return Promise.reject();
        }
        return informacoes;         
    })
}

var Informacoes = mongoose.model('Informacoes', InformacoesSchema);

module.exports = { Informacoes }