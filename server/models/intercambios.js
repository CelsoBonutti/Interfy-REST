const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Curso = require('./curso');

var PessoaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} não é um e-mail válido.'
        }
    },
    cpf: {
        type: Number,
        required: true,
        validate: {
            //código para verificar se é CPF
        }
    },
    telefone: {
        type: Number,
        required: true,
        validate: {
            //código para validar se é telefone
        }
    }
})

var IntercambioSchema = new mongoose.Schema({
    adicionais: {
        type: [AdicionalSchema]
    },
    responsavel: {
        type: PessoaSchema,
        required: true
    },
    estudante: [{
        pessoa: {
            type: PessoaSchema
        },
        dtNascimento: {
            type: Date,
            required: true
        },
        sexo: {
            type: String,
            required: true,
            maxlength: 1
        },
        conhecimento: {
            type: String,
            required: true
        },
        informacoesMedicas: [{
            alergia: {
                type: String
            },
            restricaoAlimentar: {
                type: String
            }
        }]
    }],
    contatoEmergencia: [{
        nome: {
            type: String,
            required: true
        },
        parentesco: {
            type: String,
            required: true
        },
        telefone: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator = validator.isEmail,
                message: '{VALUE} não é um e-mail válido.'
            }
        }
    }],
    curso: [{
        tipo: {
            type: String,
            required: true
        },
        cargaHoraria: {
            type: String,
            required: true
        },
        turno: {
            type: String,
            required: true
        },
        qntSemanas: {
            Type: Number,
            required: true
        },
        dtInicio: {
            type: Date,
            required: true
        },
        dtFim: {
            type: Date,
            required: true
        },
        instituicao:{
            type: mongoose.Types.ObjectId,
            ref: 'Instituicao'
        },
        valor:{
            type: Number,
            validate:{
                validator: validator.isCurrency
            }
        }
    }]
})

IntercambioSchema.methods.calcularValor = function () {
    var valor = this.curso.valor;
    this.adicionais.foreach(adicional => {
        valor += adicionais.valor;
    });
}