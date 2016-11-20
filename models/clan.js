var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    name: {type: String, required: true, unique: true},
    shortName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    user: [{type: Schema.Types.ObjectId, ref: "users"}],
    admin: {type: Schema.Types.ObjectId, ref: "users"}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('clan', schema);

