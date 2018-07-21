const mongoose = require('mongoose');
const _ = require('lodash');

var FotoSchema = new mongoose.Schema({
    url_imagem: {
        type: String,
        required: true,
    },
    titulo: {
        type: String,
        required: true,
    }
})

var Foto = mongoose.model('Foto', FotoSchema);

module.exports = { Foto };