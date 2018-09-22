const mongoose = require('mongoose');
const { Intensity } = require('./intensity');

let CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5
    },
    description: {
        type: String,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true,
        validate:{
            validator: function(school){
                let { School } = require('./school');  
                return School.exists(school);
            },
            message: 'Escola inexistente'
        }
    }
})

CourseSchema.pre('remove', function(next){
    let course = this;
    Intensity.find({course: course._id}).then((intensity)=>{
        intensity.forEach(intensity=>{
            intensity.remove();
        });
        next();
    })
    next();
})

CourseSchema.statics.exists = function(id){
    Course = this;
    return Course.count({_id: id}).then((count)=>{
        return (count>0);
    })
}

let Course = mongoose.model('Course', CourseSchema);

module.exports = { Course, CourseSchema };
