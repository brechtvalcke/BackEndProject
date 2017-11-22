let GroupModel = require('../model/GroupModel');

module.exports = class GroupRepositorie {
    constructor() {}

    getGroups(userID) {
        // todo sort on last message first or date created when no messages are present
        return new Promise((resolve, reject) => {
            GroupModel.find({
                    'users.userID': userID
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
            GroupModel.find({
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
    updateGroup(group) {
        return new Promise((resolve, reject) => {
            try {
                GroupModel.findByIdAndUpdate(group._id, group, function (err, res) {
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
};