var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	nickName: {type: String, required: true},
	text: {type:String, required: true},
	time: {type: Date, required: true}
});


module.exports = mongoose.model('msg', schema);

