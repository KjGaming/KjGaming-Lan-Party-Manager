var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    number: {type: Number},
    sold: {type: Number},
    info: {type: String}

});


module.exports = mongoose.model('product', schema);

