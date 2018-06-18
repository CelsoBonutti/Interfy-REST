const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { Curso } = require('./curso');

<<<<<<< HEAD

=======
>>>>>>> 7af0b5f68a81f36e4e284be8f051a04929d24e6d
var InstituicaoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: false,
        minlength: 5,
        unique: false,
    },
    pais: {
        type: string,
        minlength: 2,
        maxlength: 2,
        required: true
    },
    cidade: {
        type: string,
        maxlength: 20,
        required: true
    },
    diferenciais: {
        type: [diferencialSchema]
    },
<<<<<<< HEAD
=======
    cursos: {
        type: [CursoSchema]
    },
>>>>>>> 7af0b5f68a81f36e4e284be8f051a04929d24e6d
    fotos: {
        type: [String],
        required: true,
    },
<<<<<<< HEAD
    cursos: [{
        type: mongoose.Types.ObjectId,
        ref: 'Curso'
    }]
})

InstituicaoSchema.statics.findAndFilter = function (filter) {
    return this.find({
        pais: {$in: [filter.paises]},
        cidade: {$in: [filter.cidades]}
    }).then().populate({
        path: 'cursos',
        populate: {
            path: 'cargaHoraria',
            populate: {
                path: 'turno',
                model: 'Turno',
                descricao: { $in: [filter.descricaoTurno] }
            },
            match: {
                descricao: { $in: [filter.descricaoCarga] }
            }
        },
        match: {
            titulo: filter.titulo
        }
    }).populate({
        path: 'diferenciais'
    })
=======
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
            type: Schema.Types.ObjectId,
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
        }
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

InstituicaoSchema.statics.findByFilter = function () {
    return InstituicaoSchema.findBy(filter);
>>>>>>> 7af0b5f68a81f36e4e284be8f051a04929d24e6d
}

var Instituicao = mongoose.model('Instituicao', InstituicaoSchema);

module.exports = { Instituicao };