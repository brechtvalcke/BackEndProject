let UserModel = require('../model/UserModel');

module.exports = class UserRepositorie {
    constructor() {
    }

    getFriends(userID){
        return new Promise((resolve, reject) => {
            UserModel.find({'_id': userID})
                .sort({name: 'asc'})
                .limit(25)
                .exec((error, results) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(results);
                })
        });
    }

    getNearbyFriends(userID){
        return new Promise((resolve, reject) => {

        });
    }

    updateLocation(userID,body){
        return new Promise((resolve, reject) => {

        });
    }

    createAccount(body){
        return new Promise((resolve, reject) => {

        });
    }
};
