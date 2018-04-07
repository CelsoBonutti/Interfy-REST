var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://celso:123piroca@ds231589.mlab.com:31589/interfy', {useMongoClient: true});

module.exports = {mongoose};
