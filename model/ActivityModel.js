let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let activitySchema = new Schema({
    _id:  { type: Schema.ObjectId, auto: true },
    name: {type: String, required: true},
    votes: [{userID: String}],
});