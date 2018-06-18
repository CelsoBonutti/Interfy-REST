const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { Curso } = require('./curso');

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
    cursos: {
        type: [CursoSchema]
    },
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
    })
}

var Instituicao = mongoose.model('Instituicao', InstituicaoSchema);

module.exports = { Instituicao };