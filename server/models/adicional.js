const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');


var AdicionalSchema = new mongoose.Schema({
    adicionais: [{
            descricao: {
                type: String,
                required: true
            },
                valor:{
                    type: Number,
                    required: true
                },
            }],
})

AdicionalSchema.statics.exists = function(id){
    Adicional = this;
    return Adicional.count({_id: id}).then((count)=>{
        return (count>0);
    })
}

var Adicional = mongoose.model('Adicional', AdicionalSchema);

module.exports = { Adicional };