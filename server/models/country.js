const mongoose = require('mongoose');

const ClimateSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    },
    months: {
        type: String,
        required: true
    },
    weather: {
        type: String,
        required: true
    },
    minTemp: {
        type: Number,
        required: true
    },
    maxTemp: {
        type: Number,
        required: true
    }
})

const VisaSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        min: 0,
        max: 5
    }
})

const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    acronym: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 2
    },
    capital: {
        type: String,
        required: true
    },
    continent: {
        type: String,
        required: true
    },
    languages: {
        type: [String],
        required: true
    },
    currency: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 3
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    visa: {
        type: [VisaSchema],
        required: true
    },
    climate: {
        type: [ClimateSchema],
        required: true
    },
    tips: {
        type: String,
        required: true
    }
})

CountrySchema.statics.exists = function (id) {
    Country = this;
    return Country.count({
        _id: id
    }).then((count) => {
        return (count > 0);
    })
}

const Country = mongoose.model('Country', CountrySchema);

module.exports = {
    Country
};