const mongoose = require('mongoose');
const _ = require('lodash');
const { Shift } = require('./shift')

let IntensitySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true,
        validate:{
            validator: function(school){
                const { School } = require('./school');     
                return School.exists(school);
            },
            message: 'Escola inexistente'
        }
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        validate:{
            validator: function(course){
                const { Course } = require('./course');
                return Course.exists(course);
            },
            message: 'Curso inexistente'
        }
    }
})

IntensitySchema.pre('remove', function(next){
    let intensity = this;
    Shift.find({intensity: intensity._id}).then((shift)=>{
        shift.forEach(shift => {
            shift.remove();            
        });
        next();
    })
    next();
})

IntensitySchema.statics.exists = function(id){
    Intensity = this;
    return Intensity.count({_id: id}).then((count)=>{
        return (count>0);
    })
}

let Intensity = mongoose.model('Intensity', IntensitySchema);

module.exports = { Intensity };
