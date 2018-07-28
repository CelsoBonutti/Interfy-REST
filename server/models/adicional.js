const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');


var AdicionalSchema = new mongoose.Schema({
 descricao: {
    type: String,
    required: true
    },
    valor: {
    type: Number,
    required: true,
    validate: {
    validator: validator.isCurrency,
    message: '{VALUE} não é um valor válido.'
        }
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
            },
intercambio: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'Intercambio',
        required: true,
        validate:{
                validator: function(intercambio){
                    var { Intercambio } = require('./intercambios');  
                        return Intercambio.exists(intercambio);
                    },
                    message: 'Intercambio inexistente'
                }
            }
})

AdicionalSchema.statics.exists = function(id){
    Adicional = this;
    return Adicional.count({_id: id}).then((count)=>{
        return (count>0);
    })
}

var Adicional = mongoose.model('Adicional', AdicionalSchema);

module.exports = { Adicional };