var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {type: String, required: true},
    time: {type: String, required: true},
    mode: {type: Number, required: true} // 0 = LAN , 1 = Tournaments, 2 = Outhers
});

module.exports = mongoose.model('timetable', schema);

