let GroupRepositorie = require('../repository/groupRepositorie');

module.exports = class GroupService {
    constructor(){
        this.groupRepositorie = new GroupRepositorie();
    }

    getGroups(userID){
        return new Promise((resolve, reject) => {
            this.groupRepositorie.getGroups(userID)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }

    getGroup(groupID){
        return new Promise((resolve, reject) => {
            this.groupRepositorie.getGroup(groupID)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }

    createGroup($json){
        return new Promise((resolve, reject) => {
            let promises = [this.groupRepositorie.createGroup($json),this.sendInviteToFacebookFriends(0,1)];
            // TODO call facebook API to send invite
            Promise.all(promises)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }

    sendInviteToFacebookFriends(userID,...friendsID) {
        return new Promise((resolve, reject) => {
        });
    }
};