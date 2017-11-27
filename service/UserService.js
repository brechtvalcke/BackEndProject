let UserRepositorie = require('../repository/UserRepositorie');

module.exports = class GroupService {
    constructor() {
        this.userRepositorie = new UserRepositorie();
    }
    getOrCreateUserOnLogin(fbProfile,accesToken){
        return new Promise((resolve,reject) => {
            this.userRepositorie.getUserById(fbProfile.id)
            .then(result => {
                if (result !==null){
                    this.userRepositorie.getFriendsWithToken(fbProfile,accesToken).then(friends => {
                        let friendArray = [];
                        friends.data.forEach(friend => {
                            friendArray.push(friend.id);
                        });
                        this.userRepositorie.updateUserWithFbProfile(fbProfile,accesToken,friendArray).then(newUser => {
                            resolve(newUser);
                        })
                        .catch(error => {
                            reject(error);
                        })
                    })
                    .catch(error => {
                        reject(error);
                    })

                    
                }
                else
                {
                    this.userRepositorie.getFriendsWithToken(fbProfile,accesToken).then(friends => {
                        let friendArray = [];
                        friends.data.forEach(friend => {
                            friendArray.push(friend.id);
                        });
                    this.userRepositorie.createUserWithFbProfile(fbProfile,accesToken,friendArray)
                    .then(succes => {
                        this.userRepositorie.getUserById(fbProfile.id)
                        .then( userAfterCreate => {
                            if (userAfterCreate !==null){
                                resolve(userAfterCreate);
                            }
                        })
                        .catch(error => {
                            reject(error);
                        })
                    }).catch(error => {
                        reject(error);
                    });
                })
                .catch(error => {
                    reject(error);
                });
                }
                
            })
            .catch(error => {
                reject(error);
            });
        });
    }
    getFriends(userID){
        return new Promise((resolve, reject) => {
            this.userRepositorie.getFriends(userID)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }

    getNearbyFriends(userID){
        return new Promise((resolve, reject) => {
            this.userRepositorie.getNearbyFriends(userID)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }

    updateLocation(userID,body){
        return new Promise((resolve, reject) => {
            this.userRepositorie.updateLocation(userID,body)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }
    
};
