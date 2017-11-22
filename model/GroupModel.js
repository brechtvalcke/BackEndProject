let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let patternString = '/[a-zA-Z0-9]/';

let groupSchema = new Schema({
    name: { type:String, required:true },
    timeSlot: [{
        _id:  { type: Schema.ObjectId, auto: true },
        time: Number,
        selected: { type: Boolean, default: false }
    }],
    activity: [{
        _id:  { type: Schema.ObjectId, auto: true },
        name: {type: String, required: true},
        users: [{userID: String}],
    }],
    users:[{
        _id: {type: String, required: true},
        accepted: { type: Boolean, default: false }
    }],
    messages:[{senderId: String, message: {}, dateSent: { type: Date, default: Date.now() }, usersViewed : {_id: String}}],
    createBy: String,
    createdOn: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Group',groupSchema);