let GroupModel = require('../model/GroupModel');
let mongoose = require("mongoose");

module.exports = class GroupRepository {
    constructor() {
    }
    getGroups(userID) {
        // todo sort on last message first or date created when no messages are present
        return new Promise((resolve, reject) => {
            GroupModel.find({
                'users._id': userID
            })
                .sort({
                    createdOn: 'desc'
                })
                .exec((error, results) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(results);
                })
        });
    }

    getGroup(groupID) {
        return new Promise((resolve, reject) => {
            GroupModel.aggregate([
                {
                    $match: {"_id": mongoose.Types.ObjectId(groupID)}
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "users._id",
                        foreignField: "_id",
                        as: "users"
                    }
                }
            ]).exec((error, results) => {
                if (error) {
                    reject(error);
                }

                resolve(results);
            });

        });
    }

    removeOldGroups(userID) {
        return new Promise((resolve, reject) => {
            let now = Date.now();

            GroupModel.remove({
                'users._id': ObjectId(userID),
                'createdOn': {$lt: now}
            }).exec((error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            })
        });
    }

    createGroup(group) {
        return new Promise((resolve, reject) => {
            try {
                group.save((error, group) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(group._id);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    updateGroupName(updateGroupName, groupID) {
        return new Promise((resolve, reject) => {
            try {
                GroupModel.findByIdAndUpdate(groupID, updateGroupName, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            } catch (error) {
                reject(error);
            }
        })

    }

    addActivityForGroup(activity, groupID) {
        return new Promise((resolve, reject) => {
            try {
                GroupModel.update(
                    {_id: mongoose.Types.ObjectId(groupID)},
                    {$push: {activity: activity}},
                    function (err, raw) {
                        if (err) {
                            reject(err);
                        }
                        resolve(raw);
                    }
                )
            } catch (error) {
                reject(error);
            }
        })
    }

    updateActivityInGroup(activity, groupID) {
        return new Promise((resolve, reject) => {
            try {
                GroupModel.update(
                    {_id: mongoose.Types.ObjectId(groupID), "activity._id": mongoose.Types.ObjectId(activity._id)},
                    {
                        $set: {
                            "activity.$": activity
                        }
                    },
                    function (err, raw) {
                        if (err) {
                            reject(err);
                        }
                        resolve(raw);
                    }
                )
            } catch (error) {
                reject(error);
            }
        });
    }

    addTimeslotForGroup(body, groupID) {
        return new Promise((resolve, reject) => {
            try {
                GroupModel.update(
                    {_id: groupID},
                    {$push: {timeSlot: body}},
                    function (err, raw) {
                        if (err) {
                            reject(err);
                        }
                        resolve(raw);
                    })
            } catch (error) {
                reject(error);
            }
        });
    }

    voteForTimeSlotInGroup(groupID, timeSlotID, userID) {
        return new Promise((resolve, reject) => {
            try {
<<<<<<< HEAD
                GroupModel.update({
                        _id: mongoose.Types.ObjectId(groupID),
                        "timeSlot._id": mongoose.Types.ObjectId(timeSlotID)
                    },
                    {
                        $addToSet: {
                            "timeSlot.$.votes": "test123"
=======
                GroupModel.findOne({'_id':groupID})
                .exec((err,res) => {
                    if(err) {
                        reject(err);
                    }
                    for (let i = 0;i<= res.timeSlot.length-1;i++) {
                        if (res.timeSlot[i]._id.toString() === timeSlotID) {
                            res.timeSlot[i].votes.push(userID);
>>>>>>> de56ca1804f550db6bfd9fcf73d8f9440772d8b2
                        }
                    }
                    res.save(err => {
                        if(err){
                            reject(err);
                        }
                        resolve(res);
                    });

                });
            } catch (error) {
                reject(error);
            }
        });
    }

    voteForActivityInGroup(groupID, activityID, userID) {
        return new Promise((resolve, reject) => {
            try {
                GroupModel.findOne({'_id':groupID})
                .exec((err,res) => {
                    if(err) {
                        reject(err);
                    }
                    
                    for (let i = 0;i<= res.activity.length-1;i++) {
                        if (res.activity[i]._id.toString() === activityID) {
                            res.activity[i].votes.push(userID);
                        }
                    }
                    res.save(err => {
                        if(err){
                            reject(err);
                        }
                        resolve(res);
                    });

                });
                
          
            } catch (error) {
                reject(error);
            }
        });
    }

};