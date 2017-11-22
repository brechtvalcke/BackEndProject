let GroupRepositorie = require('../repository/GroupRepositorie');
let GroupModel = require("../model/GroupModel");
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

    createGroup(groupToCreate){
        return new Promise((resolve, reject) => {


            let promises = [this.groupRepositorie.createGroup(groupToCreate)];
            // TODO call facebook API to send invite
            try {
                Promise.all(promises)
                    .then(result => resolve(result))
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    });
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
    updateGroup(body){
        return new Promise((resolve,reject)=>{
            const group = new GroupModel(body);
            this.groupRepositorie.updateGroup(group);
        })
    }
};