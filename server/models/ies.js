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
    fotos: {
        type: [String],
        required: true,
    },
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
}

var Instituicao = mongoose.model('Instituicao', InstituicaoSchema);

module.exports = { Instituicao };