const mongoose = require('mongoose');
const _ = require('lodash');

let FotoSchema = new mongoose.Schema({
    url_imagem: {
        type: String,
        required: true,
    },
    titulo: {
        type: String,
        required: true,
    }
})

let Foto = mongoose.model('Foto', FotoSchema);

module.exports = { Foto };