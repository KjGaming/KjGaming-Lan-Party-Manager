var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        name: {type: String, required: true}, // Tournament name
        gameName: {type: String, required: true}, // Game name
        mode: {type: String, required: true, enum: ['b16', 'b8', 'b4', 'lb8', 'lb4', 'swiss']}, // Game mode
        size: {type: Number, required: true}, // Game player size
        playerMode: {type: String, required: true, enum: ['User', 'Clan']}, // Game mode Clan or User
        status: {type: String, required: true, enum: ['on', 'off', 'end']},
        statusUser: {type: String, required: true, enum: ['kjg', 'user']},
        games: [{
            gameId: {type: Number}, // Game id
            team1: {type: String},
            team2: {type: String},
            result1: {type: Number},
            result2: {type: Number},
            rounds: {type: String},
            timeStart: {type: String},
            timeDuration: {type: String},
            map: {type: String}
        }],
        placement : [{
            number: {type: Number},
            team: {type: String}
        }],
        player: [{type: Schema.Types.ObjectId, ref: "users"}],
        clan: [{type: Schema.Types.ObjectId, ref: "clan"}]
    })
    ;

module.exports = mongoose.model('tournament', schema);