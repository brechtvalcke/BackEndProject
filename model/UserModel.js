let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userModel = new Schema({
    facebookID: String,
    lastLocation: Number,
    friends: [String]
});

module.exports = mongoose.model('User',userModel);