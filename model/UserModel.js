let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userModel = new Schema({
    _id: String,
    lastLocation: Number,
    friends: [this],
    photoUrl: String,
    lastLogin: Date,
    name: String,
    email: String,
});

module.exports = mongoose.model('User',userModel);