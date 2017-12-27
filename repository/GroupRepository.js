let GroupModel = require('../model/GroupModel');
let mongoose = require("mongoose");

module.exports = class GroupRepository {
    constructor() {
    }
    getGroups(userID) {
        // todo sort on last message first or date created when no messages are present
        return new Promise((resolve, reject) => {
            GroupModel.aggregate([
                {
                    $match: {'users._id': userID},

                },
                { $sort: { createdOn: -1 } },
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
            /*
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
                })*/
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
            ]).exec((error, result) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
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
                GroupModel.update(
                    {'_id': groupID, 'timeSlot._id': timeSlotID},
                    {$addToSet: {"timeSlot.$.votes": userID}},
                    function(err,affected){
                        if (err){
                            reject(err);
                        }
                        if (affected.nModified === 0){
                            return new Promise((resolve, reject) => {
                                new GroupRepository().removeVoteForTimeSlotInGroup(groupID,timeSlotID,userID)
                                    .then(result => {
                                        resolve(result);
                                    })
                                    .catch(error => {
                                        reject(error);
                                    })
                            });
                        }

                        resolve(affected);
                    });
            }catch (error){
                reject(error);
            }
/*
            try {
                GroupModel.findOne({'_id':groupID})
                .exec((err,res) => {
                    if(err) {
                        reject(err);
                    }
                    for (let i = 0;i<= res.timeSlot.length-1;i++) {
                        if (res.timeSlot[i]._id.toString() === timeSlotID) {
                            let userAlreadyVoted = false;
                            res.timeSlot[i].votes.forEach(vote => {
                                if (vote === userID) {
                                    userAlreadyVoted = true;
                                }
                            });
                            if(!userAlreadyVoted){
                                res.timeSlot[i].votes.push(userID);
                            }
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
            }*/
        });
    }
    removeVoteForTimeSlotInGroup(groupID, timeSlotID, userID) {
        return new Promise((resolve, reject) => {
            try {
                GroupModel.update(
                    {'_id': groupID, 'timeSlot._id': timeSlotID},
                    {$pull: {"timeSlot.$.votes": userID}},
                    (err,affected) =>{
                        if (err){
                            reject(err);
                        }
                        resolve(affected);
                    });
                /*
                GroupModel.findOne({'_id':groupID})
                .exec((err,res) => {
                    if(err) {
                        reject(err);
                    }
                    for (let i = 0;i<= res.timeSlot.length-1;i++) {
                        if (res.timeSlot[i]._id.toString() === timeSlotID) {
    
                            res.timeSlot[i].votes = res.timeSlot[i].votes.filter(function(a) {
                                return a != userID
                            });
                        }
                    }
                    console.log(res);
                    res.save(err => {
                        if(err){
                            reject(err);
                        }
                        resolve(res);
                    });

                });*/
            } catch (error) {
                reject(error);
            }
        });
    }

    voteForActivityInGroup(groupID, activityID, userID) {
        return new Promise((resolve, reject) => {
            try {
                GroupModel.update(
                    {'_id': groupID, 'activity._id': activityID},
                    {$addToSet: {"activity.$.votes": userID}},
                    function(err,affected){
                        console.log(affected);
                        if (err){
                            reject(err);
                        }
                        if (affected.nModified === 0){
                            new GroupRepository().removeVoteForActivityInGroup(groupID,activityID,userID)
                                .then(result => {
                                    resolve(result);
                                })
                                .catch(error => {
                                    reject(error);
                                })
                        }

                        resolve(affected);
                    });
                /*
                GroupModel.findOne({'_id':groupID})
                .exec((err,res) => {
                    if(err) {
                        reject(err);
                    }
                    
                    for (let i = 0;i<= res.activity.length-1;i++) {
                        if (res.activity[i]._id.toString() === activityID) {
                            let userAlreadyVoted = false;
                            res.activity[i].votes.forEach(vote => {
                                if (vote === userID) {
                                    userAlreadyVoted = true;
                                }
                            });
                            if(!userAlreadyVoted){
                                res.activity[i].votes.push(userID);
                            }

                        }
                    }
                    res.save(err => {
                        if(err){
                            reject(err);
                        }
                        resolve(res);
                    });

                });
                */
          
            } catch (error) {
                reject(error);
            }

        });
    }
    removeVoteForActivityInGroup(groupID, activityID, userID) {
        return new Promise((resolve, reject) => {
            try {
                GroupModel.update(
                    {'_id': groupID, 'activity._id': activityID},
                    {$pull: {"activity.$.votes":userID}},
                    (err,affected) =>{
                        if (err){
                            reject(err);
                        }
                        resolve(affected);
                    });
                /*
                GroupModel.findOne({'_id':groupID})
                .exec((err,res) => {
                    if(err) {
                        reject(err);
                    }
                    
                    for (let i = 0;i<= res.activity.length-1;i++) {
                        if (res.activity[i]._id.toString() === activityID) {

                            res.activity[i].votes = res.activity[i].votes.filter(function(a) {
                                return a != userID
                            });

                        }
                    }
                    res.save(err => {
                        if(err){
                            reject(err);
                        }
                        resolve(res);
                    });

                });
                */
            } catch (error) {
                reject(error);
            }
        });
    }
    addMessageToGroup(GroupId,message) {
        return new Promise((resolve,reject) => {
            GroupModel.update(
                {_id: GroupId},
                {$push: { messages: message }},
                err => {
                    if(err) {
                        reject(err);
                    }
                    resolve(true);
                }
            );
        });

    }
    getMessagesByGroupID(groupID) {
        return new Promise((resolve,reject) => {
            GroupModel.findOne({
                _id:groupID
            },{
                messages:true,
                _id:false,
            },(err,res) => {
                if(err){
                    reject(err);
                }
                resolve(res.messages);
            })
        });
    }
};