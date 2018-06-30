const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const _ = require('lodash');
const { CargaHoraria } = require('./cargaHoraria');

var CursoSchema = new mongoose.Schema()

var Curso = mongoose.model('Curso', CursoSchema);

module.exports = { Curso };
