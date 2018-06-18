const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const _ = require('lodash');
const { CargaHoraria } = require('./cargaHoraria');

var CursoSchema = new mongoose.Schema({
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
        type: mongoose.Types.ObjectId,
        ref: 'CargaHoraria'
    }]
})

CursoSchema.statics.findByEscola = function (idEscola, filters) {

}

var Curso = mongoose.model('Curso', CursoSchema);

module.exports = { Curso };
