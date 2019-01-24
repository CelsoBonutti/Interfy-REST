/*const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    zip: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 8
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    neighborhood: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    complement: {
        type: String,
        required: false
    }
})

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
})

const MedicalInformationSchema = new mongoose.Schema({
    specialConditions: {
        type: String,
        required: false
    },
    dietaryRestrictions: {
        type: String,
        required: false
    },
    extraInfo: {
        type: String,
        required: false
    }
})

const UserInfoSchema = new mongoose.Schema({
    birthday: {
        type: Date,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    languageLevel: {
        type: String,
        required: true
    },
    address: {
        type: AddressSchema,
        required: true 
    },
    medicalInformation: {
        type: MedicalInformationSchema,
        required: true
    },
    emergencyContacts: {
        type: [ContactSchema],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    }
})

UserInfoSchema.statics.findByUserId = function (userId) {
    const UserInfo = this;

    return UserInfo.findOne({userId}).then((info) => {
        if(!info){
            return Promise.reject();
        }
        return info;
    })
}

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);

module.exports = { UserInfo }*/