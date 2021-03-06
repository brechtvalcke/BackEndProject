let GroupModel = require('../model/GroupModel');
let mongoose = require("mongoose");

module.exports = class GroupRepository {
    constructor() {
    }
    getGroups(userID) {
        // todo sort on last message first or date created when no messages are present
        return new Promise((resolve, reject) => {
            GroupModel.aggregate([
                { $match: { 'users': {'_id': userID, 'accepted': true}} },
                { $sort: {'messages.dateSent': -1,createdOn: -1}},
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

    getInvites(userID){
        return new Promise((resolve,reject) => {
            GroupModel.aggregate([
                { $match: { 'users': {'_id': userID, 'accepted': false}} },
                { $sort: { createdOn: -1 } },
            ]).exec((error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    acceptInvite(groupID,userID){
        return new Promise((resolve, reject) => {
            try {
                GroupModel.update(
                    {_id: groupID, "users._id": userID},
                    {
                        $set: {
                            "users.$.accepted": true
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

    declineInvite(groupID,userID){
        return new Promise((resolve, reject) => {
            try {
                GroupModel.update(
                    {_id: groupID, users:{"_id": userID, "accepted": false} },
                    {$pull: {"users": {"_id": userID}}},
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

    getLastAddedActivity(groupID,activityName){
        return new Promise((resolve, reject) => {
            try {
                GroupModel.find({
                    '_id': groupID,
                    'activity.name': activityName
                }).exec((error, results) => {
                        if (error) {
                            reject(error);
                        }

                        resolve(results);
                    })
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
                            console.log(err);
                        }
                        resolve(raw);
                    })
            } catch (error) {
                reject(error);
            }
        });
    }

    getLastAddedTimeslot(groupID,timeSlot){
        return new Promise((resolve, reject) => {
            try {
                GroupModel.find({
                    '_id': groupID,
                    'timeSlot.time': timeSlot.time
                }).exec((error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                })
            } catch (error) {
                reject(error);
            }
        })
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
                            //TODO: move this logic to service

                            new GroupRepository().removeVoteForTimeSlotInGroup(groupID,timeSlotID,userID)
                                .then(result => {
                                    resolve(result);
                                })
                                .catch(error => {
                                    reject(error);
                                })
                        }

                        resolve(affected);
                    });
            }catch (error){
                reject(error);
            }
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
                        if (err){
                            reject(err);
                        }
                        if (affected.nModified === 0){
                            //TODO: move this logic to service
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
            });
        });
    }
    getUsersInGroup(groupID) {
        return new Promise((resolve,reject) => {
            GroupModel.findOne({
                _id:groupID
            },{
                users:true,
                _id:false,
            },(err,res) => {
                if(err){
                    reject(err);
                }
                resolve(res.users);
            });
        });
    }
};