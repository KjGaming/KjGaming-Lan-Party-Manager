var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
        name: {type: String, required: true}, // Tournament name
        gameName: {type: String, required: true}, // Game name
        mode: {type: String, required: true, enum: ['b16', 'b8', 'b4', 'swiss']}, // Game mode
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
            timeEnd: {type: String},
            timeDuration: {type: String},
            map: {type: String},
            event: {type: Schema.Types.ObjectId, ref: "event"},
            voteRoom : {type: Number}
        }],
        swiss : {
            secondRound : {type: Boolean},
            thirdRound : {type: Boolean},
            bracketRound : {type: Boolean},
            results: [{
                name: {type: String},
                win : {type: Number},
                lose: {type: Number},
                qualified : {type: Number}
            }]
        },

        placement : [{
            number: {type: Number},
            team: {type: String}
        }],
        player: [{type: Schema.Types.ObjectId, ref: "users"}],
        clan: [{type: Schema.Types.ObjectId, ref: "clan"}],
        admin: {type: Schema.Types.ObjectId, ref: "users"}
    });

module.exports = mongoose.model('tournament', schema);