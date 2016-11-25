var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    info: {type: String}
});


module.exports = mongoose.model('product', schema);

