const mongoose = require('mongoose');
const validator = require('validator'); 
const jwt = require('jsonwebtoken');
const moment = require('moment');
const _ = require('lodash');

var TurnoSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: [Number],
        validate: {
            validator: validator.isCurrency,
            message: '{VALUE} não é um preço válido'
        }
    },
    faixaSemana: [{
        inicio:{
            type: Number,
            required: true
        },
        fim:{
            type: Number,
            required: true
        },
        valor:{
            type: Number,
            required: true,
            validate:{
                validator: validator.isCurrency
            }
        }
    }]
})

var CargaHorariaSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: ture
    },
    turno: {
        type: TurnoSchema,
        required: true
    }
})

var CursoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 5
    },
    descricao: {
        type: String
    },
    descricao: {
        type: String,
        required: true
    },
    instituicao: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    datasInicio: {
        type: [Date],
        required: true
    },
    datasFim: {
        type: [Date],
        required: true
    },
    cargaHoraria:{
        type: [CargaHorariaSchema],
        required: true
    }
})

CursoSchema.methods.calcularValor = function(){
    var preco = this.cargaHoraria.turno.calcularValor(this.numeroSemanas())*this.numeroSemanas();
    return preco;
}

CursoSchema.methods.numeroSemanas = function(){
    // var nuSemanas = datasInicio-datasFim/7;
}

CargaHorariaSchema.methods.calcularValor = function(numeroSemanas){
    this.turno.faixaSemana.forEach(faixa => {
        if(numeroSemanas>=faixa.inicio && numeroSemanas<=faixa.fim){
            return faixa.valor;
        }
    });
}

var Curso = mongoose.model('Curso', CursoSchema);

module.exports = {Curso};
