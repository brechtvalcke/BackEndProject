let UserModel = require('../model/UserModel');

module.exports = class UserRepositorie {
    constructor() {
    }
    getUserById(userID){
        return new Promise((resolve,reject)=> {
            
            UserModel.findOne({"_id":userID})
            .exec((error,results) => {
                if(error){
                    reject(error)
                }
                resolve(results);
            });
        });
    }
    createUserWithFbProfile(fbProfile){
        return new Promise((resolve,reject)=> {
            let user = new UserModel({
                    _id:fbProfile.id,
                    photoUrl:fbProfile.photos[0].value,
                    lastLogin: new Date(),
                    name:fbProfile.displayName,
                });
            user.save((err)=> {
                if(err){
                    reject(err);
                }
                resolve(true);
            });
        })

    }
    updateUserWithFbProfile(fbProfile){
        return new Promise((resolve,reject) => {
            let paramsToUpdate = {
                photoUrl:fbProfile.photos[0].value,
                lastLogin: new Date(),
                name:fbProfile.displayName,
            }
            UserModel.findByIdAndUpdate(fbProfile.id,paramsToUpdate,function(err,raw){
                if(err){
                    reject(err);
                }
                resolve(raw);
            })
        });
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
