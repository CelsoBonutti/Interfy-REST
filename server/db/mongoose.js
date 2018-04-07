var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_STR || 'mongodb://celso:123piroca@ds231589.mlab.com:31589/interfy', {useMongoClient: true});

module.exports = {mongoose};
