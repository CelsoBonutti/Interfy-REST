const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const _ = require('lodash');
const { Instituicao } = require('./ies')
const { Intensidade } = require('./intensidade');

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
    instituicao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instituicao',
        required: true,
        validate:{
            validator: function(instituicao){
                var { Instituicao } = require('./ies');
                return Instituicao.findById(instituicao).then((instituicao)=>{
                    if(!instituicao)
                        return false;
                    return true;
                },()=>{
                    return false;
                })
            },
            message: 'Escola inexistente'
        }
    }
})

CursoSchema.pre('remove', function(next){
    var curso = this;
    Intensidade.find({curso: curso._id}).then((intensidade)=>{
        intensidade.forEach(intensidade=>{
            intensidade.remove();
        });
        next();
    })
    next();
})

var Curso = mongoose.model('Curso', CursoSchema);

module.exports = { Curso };
