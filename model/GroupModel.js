let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let patternString = '/[a-zA-Z0-9]/';

let groupSchema = new Schema({
    name: { type:String, required:true, match: patternString },
    timeSlot: [{
        time: Number,
        selected: { type: Boolean, default: false }
    }],
    activity: [{
        name: {type: String, required: true, match: patternString},
        users: [{userID: String}],
    }],
    users:[{
        userID: {type: String, required: true, match: patternString},
        accepted: { type: Boolean, default: false }
    }],
    createBy: String,
    createdOn: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Group',groupSchema);