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
    cursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    }],
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
    comentarios: {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        nota: {
            type: Number,
            min: 0,
            max: 5,
            required: true
        },
        texto: {
            type: String,
            required: true
        },
        required: false
    },
    infraestrutura: [{
        type: String,
        required: true
    }],
    atividadesExtra: [{
        type: String,
        required: true
    }]
})

InstituicaoSchema.statics.findAndFilter = function (filter) {
    // filtroPais = filter.Pais;
    // filtroCidade = filter.cidade;
    // filtroCurso = filter.cursos;
    // filtro

    return this.find({
        $cond: {
            if: { $gte: ["$size: $$filter.cidades", 0] },
            then: {cidade: {$in: [filter.cidades]},
                   pais: filtroPais},
            else: {}
        }
    }).then().populate({
        path: 'cursos',
        populate: {
            path: 'cargaHoraria',
            populate: {
                path: 'turno',
                model: 'Turno',
                match: {
                    $cond: {
                        if: { $gte: ["$size: $$filter.descricaoTurno", 0] },
                        then: {descricao: {$in: [filter.descricaoTurno]}},
                        else: {}}
                }
            },
            match: {
                $cond: {
                    if: { $gte: ["$size: $$filter.descricaoCarga", 0] },
                    then: {descricao: {$in: [filter.descricaoCarga]}},
                    else: {}}
            }
        },
        match: {
            $cond: {
                if: {$eq: ["$$filter.tituloCurso", null]},
                then: {},
                else: {titulo: filter.titulo}
            }
        }
    })
}

InstituicaoSchema.statics.findAndFilter = function(filter){
    Instituicao = this;

    return Instituicao.find({})
}

var Instituicao = mongoose.model('Instituicao', InstituicaoSchema);

module.exports = { Instituicao };