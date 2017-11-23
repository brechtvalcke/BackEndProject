let UserRepositorie = require('../repository/UserRepositorie');

module.exports = class GroupService {
    constructor() {
        this.userRepositorie = new UserRepositorie();
    }
    getOrCreateUserOnLogin(fbProfile){
        return new Promise((resolve,reject) => {
            this.userRepositorie.getUserById(fbProfile.id)
            .then(result => {
                if (result !==null){
                    this.userRepositorie.updateUserWithFbProfile(fbProfile).then(newUser => {
                        resolve(newUser);
                    })
                    .catch(error => {
                        reject(error);
                    })
                    
                }
                else
                {
                    this.userRepositorie.createUserWithFbProfile(fbProfile)
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
