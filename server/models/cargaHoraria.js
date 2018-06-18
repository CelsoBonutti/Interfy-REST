const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const _ = require('lodash');
const { Turno } = require('./turno')

var CargaHorariaSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    turno: [{
        type: Schema.Types.ObjectId,
        ref: 'Turno'
    }]
})

var CargaHoraria = mongoose.model('CargaHoraria', CargaHorariaSchema);

module.exports = { CargaHoraria };
