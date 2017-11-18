let GroupModel = require('../model/GroupModel');

module.exports = class GroupRepositorie {
    constructor() {
    }

    getGroups(userID) {
        return new Promise((resolve, reject) => {
            GroupModel.find({'users.userID': userID})
                .sort({createdOn: 'desc'})
                .limit(25)
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
            GroupModel.find({'_id': groupID})
                .exec((error, results) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(results);
                })
        });
    }

    createGroup(body) {
        return new Promise((resolve, reject) => {
            try{
                let schema = new GroupModel({
                    name: body.name,
                    timeSlot: body.timeSlot,
                    activity: body.activity,
                    users: body.users,
                    createBy: body.createBy
                });

                schema.save(error => {
                    if (error) {
                        reject(error);
                    }else {
                        resolve(true);
                    }
                });
            }catch (error){
                throw error;
            }
        });
    }
};