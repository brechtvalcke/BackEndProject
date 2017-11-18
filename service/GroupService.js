let GroupRepositorie = require('../repository/GroupRepositorie');

module.exports = class GroupService {
    constructor(){
        this.groupRepositorie = new GroupRepositorie();
    }

    getGroups(userID){
        return new Promise((resolve, reject) => {
            this.groupRepositorie.getGroups(userID)
                .then(result => resolve(result))
                .catch(error => reject(error));

            //TODO get users profile image URL from fb??
        });
    }

    getGroup(groupID){
        return new Promise((resolve, reject) => {
            this.groupRepositorie.getGroup(groupID)
                .then(result => resolve(result))
                .catch(error => reject(error));

            //TODO get users profile image URL from fb??

        });
    }

    createGroup($json){
        return new Promise((resolve, reject) => {
            let promises = [this.groupRepositorie.createGroup($json),this.sendInviteToFacebookFriends(0,1)];
            // TODO call facebook API to send invite
            try {
                Promise.all(promises)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            }catch (error){
                console.error(error);
                reject(error);
            }
        });
    }

    sendInviteToFacebookFriends(userID,...friendsID) {
        return new Promise((resolve, reject) => {
        });
    }
};