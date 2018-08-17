const mongoose = require('mongoose');
const _ = require('lodash');
const { Turno } = require('./turno')

let IntensidadeSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    instituicao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instituicao',
        required: true,
        validate:{
            validator: function(instituicao){
                let { Instituicao } = require('./escola');     
                return Instituicao.exists(instituicao);
            },
            message: 'Escola inexistente'
        }
    },
    curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true,
        validate:{
            validator: function(curso){
                let { Curso } = require('./curso');
                return Curso.exists(curso);
            },
            message: 'Curso inexistente'
        }
    }
})

IntensidadeSchema.methods.adicionarTurnos = function(turnos){
    let cargaHoraria = this;
    _.concat(cargaHoraria.turno, turnos);
    return cargaHoraria.save().then(() =>{
        return 
    })

    return user.save().then(() => {
        return token;
      });
}

IntensidadeSchema.pre('remove', function(next){
    let intensidade = this;
    Turno.find({intensidade: intensidade._id}).then((turno)=>{
        turno.forEach(turno => {
            turno.remove();            
        });
        next();
    })
    next();
})

IntensidadeSchema.statics.exists = function(id){
    Intensidade = this;
    return Intensidade.count({_id: id}).then((count)=>{
        return (count>0);
    })
}

let Intensidade = mongoose.model('Intensidade', IntensidadeSchema);

module.exports = { Intensidade };
