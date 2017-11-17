let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let groupSchema = new Schema({
    name: { type:String, required:true },
    timeSlot: [{
        time: Number,
        selected: { type: Boolean, default: false }
    }],
    activity: [{
        type: String,
        users: [{userID: String}],
    }],
    user:[{
        userID:String,
        accepted:Boolean
    }],
    createdOn: { type: Date, default: Date.now() }
});
