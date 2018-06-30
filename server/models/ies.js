const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { Curso } = require('./curso');
//Instituicao:[Curso[Carga[Turno]]]
var InstituicaoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: false,
        minlength: 5,
        unique: false,
    },
    pais: {
        type: String,
        minlength: 2,
        maxlength: 2,
        required: true
    },
    cidade: {
        type: String,
        maxlength: 20,
        required: true
    },
    cursos: [{
        titulo: {
            type: String,
            required: true,
            minlength: 5
        },
        descricao: {
            type: String,
            required: true
        },
        cargaHoraria: [{
            descricao: {
                type: String,
                required: true
            },
            turno: [{
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
                }]
            }]
        }]
    }],
    fotos: {
        type: [String],
        required: true,
    },
    diferenciais: [{
        descricao: {
            type: String,
            required: true
        },
        icone: {
            type: String,
            required: true
        }
    }],
    comentarios: {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        nota: {
            type: Number,
            min: 0,
            max: 5,
            required: true
        },
        texto: {
            type: String,
            required: true
        },
        required: false
    },
    infraestrutura: [{
        type: String,
        required: true
    }],
    atividadesExtra: [{
        type: String,
        required: true
    }]
})

InstituicaoSchema.statics.findAndFilter = function (filter) {
    var Instituicao = this;

    instituicao = Instituicao.find({pais: filter.pais});
    if(filter.turnos){
       var turno = _filter(instituicao,{'cursos.cargas.turno.nome':filter.nome})
       console.log({turno});     
    }  
    if(filter.cargas){
        var cargas = _filter(cargas,{'cursos.cargas.nome':filter.nome})
        console.log({cargas}); 
    }
    if(filter.cursos){
        var cursos = _filter(cursos,{'cursos.nome':filter.nome})
        console.log({cursos}); 
    }
    if(filter.cidade){
        var cidade = _filter(cidade,{'Instituicao.nome':filter.nome})
        console.log({cidade}); 
    }
}

// InstituicaoSchema.statics.findAndFilter = function(filter){
//     Instituicao = this;

//     return Instituicao.find({})
// }

var Instituicao = mongoose.model('Instituicao', InstituicaoSchema);

module.exports = { Instituicao };