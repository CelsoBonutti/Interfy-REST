let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_STR, { useMongoClient: true });

module.exports = { mongoose };