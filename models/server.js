var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    status: {type: Boolean, default: false},
    download:{
        path: {type: String},
    },
    server: {
        mode: {type: String},
        ip: {type: String}
    }

});

module.exports = mongoose.model('server', schema);

