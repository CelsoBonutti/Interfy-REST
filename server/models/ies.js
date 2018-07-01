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
        type: String,
        minlength: 2,
        maxlength: 2,
        required: true
    },
    cidade: {
        type: String,
        maxlength: 20,
        required: true
    },
    fotos: {
        type: [String],
        required: true,
    },
    diferenciais: [{
        descricao: {
            type: String,
            required: true
        },
        icone: {
            type: String,
            required: true
        }
    }],
    infraestrutura: [{
        type: String,
        required: true
    }],
    atividadesExtra: [{
        type: String,
        required: true
    }]
})

InstituicaoSchema.statics.findByFilter = function (filter) {
    Instituicao = this;
    var filtroCidade;

    if(filter.cidade){
        filtroCidade = {
            pais: filter.pais,
            cidade: {$in: filter.cidade}
        }
    }
    else{
        filtroCidade = {
            pais: filter.pais
        } 
    }

    return Instituicao.find(filtroCidade)
        .then((instituicao) =>{
            instituicaoId = _.map(instituicao, '_id');
            
            var filtroCurso;
            if(filter.curso){
                filtroCurso = {
                    instituicao: {$in: instituicaoId},
                    titulo: {$in: filter.curso}
                }    
            }
            else{
                filtroCurso = {
                    instituicao: instituicaoId
                }
            }
            return Curso.find(filtroCurso)
            .then((curso)=>{
                cursoId = _.map(curso, '_id');
                var filtroIntensidade;

                if(filter.intensidade){
                    filtroIntensidade = {
                        instituicao: {$in: instituicaoId},
                        curso: {$in: cursoId},
                        descricao: {$in: filter.intensidade}
                    }
                }
                else{
                    filtroIntensidade = {
                        instituicao: {$in: instituicaoId},
                        curso: {$in: cursoId}
                    }
                }
                return Intensidade.find(filtroIntensidade)
                    .then((intensidade) =>{
                        intensidadeId = _.map(intensidade, '_id');

                        var filtroTurno;
                        if(filter.turno){
                            filtroTurno = {
                                instituicao: {$in: instituicaoId},
                                intensidade: {$in: intensidadeId},
                                nome: {$in: filter.turno}
                            }
                        }
                        else{
                            filtroTurno = {
                                instituicao: {$in: instituicaoId},
                                intensidade: {$in: intensidadeId}
                            }
                        }
                        return Turno.find(filtroTurno).populate({
                            path:'intensidade',
                            populate:{
                                path:'curso',
                                populate:{
                                    path:'instituicao',
                                    sort: 'nome'
                                },
                                sort:'titulo'
                            },
                            sort:'descricao'
                        })
                    })
            })
    })
}

InstituicaoSchema.pre('remove', function(next){
    var instituicao = this;
    Curso.find({instituicao: instituicao._id}).then((curso)=>{
        curso.forEach(curso => {
            curso.remove();
        });
        next();
    })
    next();
})

InstituicaoSchema.statics.exists = function(id){
    Instituicao = this;
    return Instituicao.count({_id: id}).then((count)=>{
        return (count>0);
    })
}

var Instituicao = mongoose.model('Instituicao', InstituicaoSchema);

module.exports = { Instituicao };