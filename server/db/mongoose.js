var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://192.168.0.28/dev', { useMongoClient: true });

module.exports = { mongoose };
