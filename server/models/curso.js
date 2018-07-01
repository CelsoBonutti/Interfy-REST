const mongoose = require('mongoose');
const _ = require('lodash');
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
                return Instituicao.exists(instituicao);
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
