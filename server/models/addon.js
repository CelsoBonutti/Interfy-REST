const mongoose = require('mongoose');
const validator = require('validator');

let AddonSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        validate: {
            validator: function(){
                return validator.isCurrency(this.price);
            },
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
        type: String,
        validate: {
            validator: function(){
                return validator.isCurrency(this.price);
            },
            message: '{VALUE} não é um valor válido'
        },
        required: function(){
            return this.tipo === 'insurance'
        }
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        validate: {
            validator: function (school) {
                const {School} = require('./school');
                return School.exists(school);
            },
            message: 'Escola inexistente'
        },
        required: false
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: false,
        validate: {
            validator: function (country) {
                const {Country} = require('./country');
                return Country.exists(country);
            },
            message: 'País inexistente'
        }
    }
})

AddonSchema.statics.exists = function (id) {
    Addon = this;
    return Addon.count({
        _id: id
    }).then((count) => {
        return (count > 0);
    })
}

let Addon = mongoose.model('Addon', AddonSchema);

module.exports = {
    Addon, AddonSchema
};