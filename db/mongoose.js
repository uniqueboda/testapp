var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://192.168.0.65:27017/pscmda');
mongoose.connect('mongodb://uniqueboda:abodeuqinu@172.105.64.137:27017/uniqueboda?authSource=admin');

module.exports = { mongoose };