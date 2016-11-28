var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name:{},
    gameName: {},
    mode: {}, //
    game
    place:{},
    player:{},

    game:[{}],


    /*title: {type: String, required: true},
    timeStart: {type: String, required: true},
    timeEnd: {type: String, required: true},
    mode: {type: Number, required: true}, // 0 = LAN , 1 = Tournaments, 2 = Outhers
    content: {type: String}*/
});

module.exports = mongoose.model('tournament', schema);