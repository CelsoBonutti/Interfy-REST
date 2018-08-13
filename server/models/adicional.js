const mongoose = require('mongoose');
const validator = require('validator');


let AdicionalSchema = new mongoose.Schema({
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
    required: false,
    validate:{
    validator: function(instituicao){
        let { Instituicao } = require('./escola');  
        return Instituicao.exists(instituicao);
                },
        message: 'Escola inexistente'
                }
            },
intercambio: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'Intercambio',
        required: false,
        validate:{
                validator: function(intercambio){
                    let { Intercambio } = require('./intercambios');  
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

let Adicional = mongoose.model('Adicional', AdicionalSchema);

module.exports = { Adicional };