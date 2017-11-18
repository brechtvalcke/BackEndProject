let GroupModel = require('../model/GroupModel');
let UserModel = require('../model/UserModel');

module.exports = class AuthorizationRepositorie{
    constructor() {
    }

    doesUserExist(userID){
        return new Promise((resolve,reject) => {
            UserModel.find({'users': userID})
                .exec((error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                })
        });
    }

    canUserAccessGroup(userID,groupID) {
        return new Promise((resolve,reject) => {
            GroupModel.find({'users.userID': userID,'_id': groupID})
                .exec((error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                })
        });
    }

    isUserAdminOfGroup(userID, groupID) {
        return new Promise((resolve,reject) => {
            GroupModel.find({'createBy': userID,'_id': groupID})
                .exec((error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                })
        });
    }
};