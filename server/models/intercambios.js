const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var IntercambioSchema = new mongoose.Schema({
    adicionais: {
        descricao: {
            type: String,
            required: true
        },
        // icone: {
        //     type: String,
        //     required: true
        // },
        valor: {
            type: Number,
            required: true,
            validate: {
                validator: validator.isCurrency,
                message: '{VALUE} não é um valor válido.'
            }
        }
    },
    curso: {
        tipo: {
            type: String,
            required: true
        },
        cargaHoraria: {
            type: String,
            required: true
        },
        turno: {
            type: String,
            required: true
        },
        qntSemanas: {
            type: Number,
            required: true
        },
        dtInicio: {
            type: Date,
            required: true
        },
        dtFim: {
            type: Date,
            required: true
        },
        instituicao: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Instituicao',
            required: true
        },
        valor: {
            type: Number,
            validate: {
                validator: validator.isCurrency,
                message: '{VALUE} não é um valor válido.'
            },
            required: true
        }
    },
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

IntercambioSchema.virtual.valorTotal = function () {
    var valor = this.curso.valor;
    this.adicionais.foreach(adicional => {
        valor += adicionais.valor;
    });
    return valor;
}

IntercambioSchema.statics.findByUserIdAndPopulate = function (_userId) {
    var Intercambio = this;

    return Intercambio.find({ _userId }).then().populate({
        path: 'instituicao',
        select: 'nome'
    })
}

var Intercambio = mongoose.model('Intercambio', IntercambioSchema);

module.exports = { Intercambio };