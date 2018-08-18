const mongoose = require('mongoose');
const validator = require('validator');

let AdicionalSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        validate: {
            validator: validator.isCurrency,
            message: '{VALUE} não é um valor válido.'
        },
        required: true
    },
    required: {
        type: Boolean,
        required: true
    },
    type:{
        type: String,
        enum: ['visa', 'material', 'insurance'],
        required: true
    },
    coverage:{
        type: Number,
        validate: {
            validator: validator.isCurrency,
            message: '{VALUE} não é um valor válido'
        },
        required: function(){
            return this.tipo === 'insurance'
        }
    },
    instituicao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instituicao',
        validate: {
            validator: function (instituicao) {
                const {Instituicao} = require('./escola');
                return Instituicao.exists(instituicao);
            },
            message: 'Escola inexistente'
        },
        required: false
    },
    pais: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pais',
        required: false,
        validate: {
            validator: function (pais) {
                const {Pais} = require('./pais');
                return Pais.exists(pais);
            },
            message: 'País inexistente'
        }
    }
})

AdicionalSchema.statics.exists = function (id) {
    Adicional = this;
    return Adicional.count({
        _id: id
    }).then((count) => {
        return (count > 0);
    })
}

let Adicional = mongoose.model('Adicional', AdicionalSchema);

module.exports = {
    Adicional
};