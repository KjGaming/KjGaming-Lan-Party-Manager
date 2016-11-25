var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    user: {type: Schema.Types.ObjectId, ref: "users", required: true},
    ordered: {type: String, required: true},
    delivered: {type: String},
    status: {type: String, required: true, enum: ['ordered', 'delivered', 'received']},
    products: [{
        id: {type: Schema.Types.ObjectId, ref: "product", required: true},
        count: {type: Number, required: true}
    }]


});

module.exports = mongoose.model('catering', schema);

