const UserModel = require('../model/UserModel');
const graph = require('fbgraph');
module.exports = class UserRepository {
        constructor() {}
        getUserById(userID) {
            return new Promise((resolve, reject) => {

                UserModel.findOne({
                        "_id": userID
                    })
                    .exec((error, results) => {
                        if (error) {
                            reject(error)
                        }
                        resolve(results);
                    });
            });
        }
        createUserWithFbProfile(fbProfile, accesToken,friends) {
            return new Promise((resolve, reject) => {
                let user = new UserModel({
                    _id: fbProfile.id,
                    photoUrl: fbProfile.photos[0].value,
                    lastLogin: new Date(),
                    name: fbProfile.displayName,
                    email: fbProfile.emails[0].value,
                    friends: friends,
                });
                user.save((err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
            })

        }
        updateUserWithFbProfile(fbProfile, accesToken,friends) {
            return new Promise((resolve, reject) => {
                let paramsToUpdate = {
                    photoUrl: fbProfile.photos[0].value,
                    lastLogin: new Date(),
                    name: fbProfile.displayName,
                    email: fbProfile.emails[0].value,
                    friends: friends,
                }
                UserModel.findByIdAndUpdate(fbProfile.id, paramsToUpdate, function (err, raw) {
                    if (err) {
                        reject(err);
                    }
                    resolve(raw);
                })
            });
        }
        getFriendsWithToken(fbProfile, accessToken) {
            return new Promise((resolve, reject) => {
                    graph.setAccessToken(accessToken);
                    var graphObject = graph
                        .get("me/friends", function (err, res) {
                            if (err) {
                                reject(err);
                            }
                            resolve(res);
                        });
                });
            }
            getFriends(userID) {
                return new Promise((resolve, reject) => {
                    console.log(userID);
                    UserModel.findOne({
                            '_id': userID
                        })
                        .populate('friends')
                        .exec((error, result) => {
                            if (error) {
                                reject(error);
                            }
                            console.log(result);
                            
                            resolve(result.friends);
                        });
                });
            }

            getNearbyFriends(userID) {
                return new Promise((resolve, reject) => {

                });
            }

            updateLocation(userID, body) {
                return new Promise((resolve, reject) => {

                });
            }

            createAccount(body) {
                return new Promise((resolve, reject) => {

                });
            }
        };