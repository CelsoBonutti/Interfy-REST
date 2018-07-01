const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const { Turno } = require('./turno')

var IntensidadeSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    instituicao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instituicao',
        required: true
    },
    curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    }
})

IntensidadeSchema.methods.adicionarTurnos = function(turnos){
    var cargaHoraria = this;
    _.concat(cargaHoraria.turno, turnos);
    return cargaHoraria.save().then(() =>{
        return 
    })

    return user.save().then(() => {
        return token;
      });
}

IntensidadeSchema.pre('remove', function(next){
    var intensidade = this;
    Turno.find({intensidade: intensidade._id}).then((turno)=>{
        turno.forEach(turno => {
            turno.remove();            
        });
        next();
    })
    next();
})

var Intensidade = mongoose.model('Intensidade', IntensidadeSchema);

module.exports = { Intensidade };
