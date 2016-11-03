var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    shortName: {type: String, required: true},
    password: {type: String, required: true},
    user: [{type: Schema.Types.ObjectId, ref: "user"}],
    admin: {type: Schema.Types.ObjectId, ref: "user"}
});

module.exports = mongoose.model('clan', schema);

