/*const mongoose = require('mongoose');
const validator = require('validator');

const DurationSchema = new mongoose.Schema({
    numberOfWeeks:{
        type: Number,
        required: true
    },
    price:{
        type: String,
        required: true,
        validate:{
            validator: function(){
                return validator.isCurrency(this.price);
            }
        }
    },
    dates: [Date]
})

const ShiftSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: [{
        type: DurationSchema,
        required: true
    }],
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true,
        validate:{
            validator: function(school){
                let { School } = require('./school');
                return School.exists(school);
            },
            message: 'Escola inexistente.'
        }
    },
    intensity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Intensity',
        required: true,
        validate:{
            validator: function(intensity){
                let { Intensity } = require('./intensity');
                return Intensity.exists(intensity);
            },
            message: 'Intensidade inexistente'
        }
    }
})

const Shift = mongoose.model('Shift', ShiftSchema);

module.exports = { Shift };
*/