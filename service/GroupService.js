let GroupRepository = require('../repository/GroupRepository');
let GroupModel = require("../model/GroupModel");
module.exports = class GroupService {
    constructor(){
        this.groupRepositorie = new GroupRepository();
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
    updateGroupName(newName,groupID) {
        return new Promise((resolve, reject) => {
            let nameUpdateJson = {name:newName};
            this.groupRepositorie.updateGroupName(nameUpdateJson,groupID)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            })
        });
    }
    getAllActivitiesForGroup(groupID){
        return new Promise((resolve, reject) => {
            this.getGroup(groupID)
            .then(group => {
                resolve(group.activity);
            })
            .catch(error => {
                reject(error);
            })
        });
    }
    addActivityForGroup(body,groupID,userID){
        return new Promise((resolve, reject) => {
            const activity = {
                name: body.name,
                users: [{userID:userID}]
            }
            this.groupRepositorie.addActivityForGroup(activity,groupID)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            })
        });
    }
    updateActivityInGroup(body,groupID){
        return new Promise((resolve, reject) => {
            const activity = {
                _id:body._id,
                name: body.name,
                users: body.users,
            }
            this.groupRepositorie.updateActivityInGroup(activity,groupID)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            })
        });
    }
    getAllTimeslotsForGroup(groupID){
        return new Promise((resolve, reject) => {
            this.getGroup(groupID)
            .then(group => {
                resolve(group.timeSlot);
            })
            .catch(error => {
                reject(error);
            })
        });
    }

};