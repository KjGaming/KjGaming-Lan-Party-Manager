var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    time: {type: Date, default: Date.now, required: true},
    icon: {
        look: {type: String, default: "comments"},
        color: {type: String, default: "green"},
    }
});

module.exports = mongoose.model('news', schema);

