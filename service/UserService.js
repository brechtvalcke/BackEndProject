let UserRepositorie = require('../repository/UserRepositorie');

module.exports = class GroupService {
    constructor() {
        this.userRepositorie = new UserRepositorie();
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

    createAccount(body){
        return new Promise((resolve, reject) => {
            //TODO get necessary data from fb??
            this.userRepositorie.createAccount(body)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }
};
