let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    number: {type: Number},
    sold: {type: Number},
    info: {type: String},
    img: {type: String}

});


module.exports = mongoose.model('product', schema);

