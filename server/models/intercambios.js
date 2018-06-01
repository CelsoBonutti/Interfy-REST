const mongoose = require('mongoose');
const validator = require('validator'); 
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Curso = require('./curso');

var ExtraSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    curso:{
        type: mongoose.Types.ObjectId,
        required: false
    },
    valor:{
        type: Number,
        validate:{
            validator: validator.isCurrency,
            message: '{VALUE} não é um preço válido'
        },
        required: true
    }
})

var IntercambioSchema = new mongoose.Schema({
    curso:{
        type: Curso,
        required: true
    },
    extras:{
        type: [ExtraSchema]
    }
})


IntercambioSchema.methods.numeroSemanas = function(){
    var dataInicio = moment(this.curso.datasInicio[0]);
    var dataFim = moment(this.curso.datasInicio[0]);
    
    return dataFim.diff(dataInicio, 'weeks');
}

IntercambioSchema.methods.calcularValor = function() {
    var valor = this.curso.calcularValor();
    extras.foreach(extra =>{
        valor+=extra.valor;
    });
}