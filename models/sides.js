var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    lock: {type: Boolean, required: true}
});

module.exports = mongoose.model('sides', schema);

