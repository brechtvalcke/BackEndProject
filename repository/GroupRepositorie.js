let GroupModel = require('../model/GroupModel');
let ObjectId = require('objectid');

module.exports = class GroupRepositorie {
    constructor() {
    }

    getGroups(userID) {
        return new Promise((resolve, reject) => {
            console.log(userID);
            console.log(ObjectId(userID));
            GroupModel.find({'users._id': ObjectId(userID)})
                .sort({createdOn: 'desc'})
                .limit(25)
                .exec((error, results) => {
                    console.log(error);
                    console.log(results);
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