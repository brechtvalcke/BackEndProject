let UserRepository = require('../repository/UserRepository');

module.exports = class GroupService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    getOrCreateUserOnLogin(fbProfile,accesToken){
        return new Promise((resolve,reject) => {
            this.userRepository.getUserById(fbProfile.id)
            .then(result => {
                if (result !==null){
                    this.userRepository.getFriendsWithToken(fbProfile,accesToken).then(friends => {
                        let friendArray = [];
                        friends.data.forEach(friend => {
                            friendArray.push(friend.id);
                        });
                        this.userRepository.updateUserWithFbProfile(fbProfile,accesToken,friendArray).then(newUser => {
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
                    this.userRepository.getFriendsWithToken(fbProfile,accesToken).then(friends => {
                        let friendArray = [];
                        friends.data.forEach(friend => {
                            friendArray.push(friend.id);
                        });
                    this.userRepository.createUserWithFbProfile(fbProfile,accesToken,friendArray)
                    .then(succes => {
                        this.userRepository.getUserById(fbProfile.id)
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
    getProfileWithToken(accesToken) {
        return new Promise((resolve,reject) => {
            this.userRepository.getProfileWithToken(accesToken);
        });
    }
    getFriends(userID){
        return new Promise((resolve, reject) => {
            this.userRepository.getFriends(userID)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }

    getNearbyFriends(userID){
        return new Promise((resolve, reject) => {
            this.userRepository.getNearbyFriends(userID)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }

    updateLocation(userID,body){
        return new Promise((resolve, reject) => {
            this.userRepository.updateLocation(userID,body)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }
    
};
