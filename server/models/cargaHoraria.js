const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const _ = require('lodash');
const { Turno } = require('./turno')

var CargaHorariaSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    turno: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turno'
    }]
})

CargaHorariaSchema.methods.adicionarTurnos = function(turnos){
    var cargaHoraria = this;
    _.concat(cargaHoraria.turno, turnos);
    return cargaHoraria.save().then(() =>{
        return 
    })

    return user.save().then(() => {
        return token;
      });
}

CargaHorariaSchema.pre('validate', function(next){
    console.log(this.populate());
    next();
})

CargaHorariaSchema.methods.removerTurnos = function(turnos){
    
}

var CargaHoraria = mongoose.model('CargaHoraria', CargaHorariaSchema);

module.exports = { CargaHoraria };
