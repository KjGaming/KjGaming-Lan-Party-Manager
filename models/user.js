var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    nickName: {type: String, required: true, unique: true}, // User nickname
    firstName: {type: String, required: true}, // User firstname
    lastName: {type: String, required: true},// User lastnamel
    birth: {type: String, required: true},// User birth
    address: {
        street:  {type: String, required: true},// User address street
        nr: {type: Number, required: true}, // User address street number
        postalCode: {type: Number, required: true}, // User address postal code
        city: {type: String, required: true} // User address city
    },
    email: {type: String, required: true, unique: true},// User email
    seat: {type: Number, default: null},// User seat on the LAN Party
    password: {type: String, required: true},// User password
    role: {type: Number, default: 0},// User role in the LAN MANAGER
    lock: {type: Boolean, default: false},// User lock or unlock for The LAN MANAGER
    agb: {type: Boolean, default: false},// AGB
    clan: {type: Schema.Types.ObjectId, ref: "clan"},
    lan: {
        packet: {
            id: {type: Number, default: 0},// Packet id (LAN Packet | 0 = spar, 1 = complete, 2 = individually)
            paid: {type: Boolean, default: false},// Packet paid or not
            price: {type: Number, default: 0}// Packet price
        },
        food: {type: String, default: 0},// Food id
        vegi: {type: Boolean, default: false},// User vegitable
        sum: {type: Number, default: 0},// Outher coast like drinks, snacks and so on
        paid: {type: Boolean, default: false}// Paid all
    }



});


schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('users', schema);