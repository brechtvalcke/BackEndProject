let GroupModel = require('../model/GroupModel');

module.exports = class GroupRepositorie {
    constructor() {}

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
            GroupModel.findOne({
                    '_id': groupID
                })
                .exec((error, results) => {
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
    updateGroupName(updateGroupName,groupID) {
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
    addActivityForGroup(activity,groupID){
        return new Promise((resolve,reject)=> {
            try{
                GroupModel.update(
                    {_id: groupID},
                    { $push: {activity:activity}},
                    function(err,raw){
                        if(err){
                            reject(err);
                        }
                        resolve(raw);
                    }
                )
            }catch(error) {
                reject(error);
            }
        })
    }
    updateActivityInGroup(activity,groupID){
        return new Promise((resolve,reject)=>{
            try{
                GroupModel.update(
                    {_id: groupID, "activity._id":activity._id},
                    {$set:{
                        "activity.$":activity
                    }},
                    function(err,raw){
                        if(err){
                            reject(err);
                        }
                        resolve(raw);
                    }
                )
            }catch(error){
                reject(error);
            }
        });
    }
};