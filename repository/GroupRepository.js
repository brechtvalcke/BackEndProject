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
                    $match: { "_id": mongoose.Types.ObjectId(groupID)}
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

    createGroup(group) {
        return new Promise((resolve, reject) => {
            try {
                group.save(error => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(true);
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
                    {_id: groupID},
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
                    {_id: groupID, "activity._id": activity._id},
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
                GroupModel.update({
                        _id: mongoose.Types.ObjectId(groupID),
                        "timeSlot._id": mongoose.Types.ObjectId(timeSlotID)
                    },
                    {
                        $addToSet: {
                            "timeSlot.$.votes":"test123"
                        }
                    },
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

    voteForActivityInGroup(groupID, activityID, userID) {
        return new Promise((resolve, reject) => {
            try {
                GroupModel.update(
                    {_id: groupID, "activity._id": activityID},
                    {$push: {"activity.votes": userID}},
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

};