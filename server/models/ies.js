const mongoose = require('mongoose');
const validator = require('validator'); 
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var DiferencialSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    icone: {
        type: String,
        validate:{
            validator: validator.isURL,
            message: '{VALUE} não é uma URL válida'
        }
    } 
})

var InstituicaoSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
        trim: false,
        minlength: 5,
        unique: false,
    },
    pais:{
        type: string,
        minlength: 2,
        maxlength: 2,
        required: true
    },
    cidade:{
        type: string,
        maxlength: 20,
        required: true
    },
    diferenciais:{
        type: [diferencialSchema]
    },
    cursos:{
        type: [CursoSchema]
    },
    fotos:{
        type: [String],
        required: true,
    }
})

InstituicaoSchema.statics.findByFilter = function(){
    return InstituicaoSchema.findBy(filter);
}

var Instituicao = mongoose.model('Instituicao', InstituicaoSchema);

module.exports = {Instituicao};