const mongoose = require('mongoose');
const _ = require('lodash');
const { Course } = require('./course');

let OptionalSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
})

let SchoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: false,
        minlength: 5,
        unique: false,
    },
    country: {
        type: String,
        minlength: 2,
        maxlength: 2,
        required: true
    },
    city: {
        type: String,
        maxlength: 20,
        required: true
    },
    photos: {
        type: [String],
        required: true,
    },
    optionals: {
        type: [OptionalSchema],
        required: true
    },
    infrastructure: [{
        type: String,
        required: true
    }],
    extras: [{
        type: String,
        required: true
    }]
})

SchoolSchema.pre('remove', function(next){
    let school = this;
    Course.find({school: school._id}).then((course)=>{
        course.forEach(course => {
            course.remove();
        });
        next();
    })
    next();
})

SchoolSchema.statics.exists = function(id){
    School = this;
    return School.count({_id: id}).then((count)=>{
        return (count>0);
    })
}

SchoolSchema.statics.upload = function(arquivo){
    var cloudinary = require('cloudinary');
    cloudinary.config({ 
        cloud_name: 'hudson', 
        api_key: '544923467984711', 
        api_secret: 'MoYAHfJitgonAeYj9meq-62UUQc' 
      });

     return cloudinary.uploader.upload ( arquivo, function (result) {
      });
  }

let School = mongoose.model('School', SchoolSchema);

module.exports = { School, SchoolSchema };