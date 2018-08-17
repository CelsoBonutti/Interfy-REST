const mongoose = require('mongoose');
const validator = require('validator');

const AccomodationSchema = new mongoose.Schema({
    roomType: {
        type: String,
        enum: ['Single', 'Shared'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    supplies: {
        name:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true,
            validate: {
                validator: validator.isCurrency,
                message: '{VALUE} não é um valor válido.'
            }
        }
    },
    dateRange:[{
        startDate:{
            type: Date
        },
        endDate:{
            type: Date,
            validate: {
                validator: function(){
                    this.endDate < this.startDate
                },
                message: 'A data de fim deve ser maior que a data de início'
            }
        },
        price:{
            type: Number,
            validate: {
                validator: validator.isCurrency,
                message: '{VALUE} não é um valor válido'
            }
        }
    }],
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instituicao',
        required: true
    }
})

const Accomodation = mongoose.model('Accomodation', AccomodationSchema);

module.exports = { Accomodation };