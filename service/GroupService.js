let GroupRepository = require('../repository/GroupRepository');
let GroupModel = require("../model/GroupModel");

module.exports = class GroupService {
    constructor(){
        this.groupRepository = new GroupRepository();
    }

    getGroups(userID){
        return new Promise((resolve, reject) => {
            this.groupRepository.getGroups(userID)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }
    getInvites(userID){
        return new Promise((resolve, reject) => {
            this.groupRepository.getInvites(userID)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }

    getGroup(groupID){
        return new Promise((resolve, reject) => {
            this.groupRepository.getGroup(groupID)
                .then(result => resolve(result))
                .catch(error => reject(error));

        });
    }

    createGroup(groupToCreate){
        return new Promise((resolve, reject) => {
            let promises = [this.groupRepository.createGroup(groupToCreate)];

            // TODO call facebook API to send invite
            try {
                Promise.all(promises)
                    .then(result => {
                        let addedGroup = new GroupModel();
                        addedGroup._id = result[0];
                        resolve(addedGroup)
                    })
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
            this.groupRepository.updateGroupName(nameUpdateJson,groupID)
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
            };
            this.groupRepository.addActivityForGroup(activity,groupID)
            .then(result => {
                this.getLastAddedActivity(groupID,activity.name)
                    .then(result => { resolve(result)})
                    .catch(error => { reject(error); })
            })
            .catch(error => {
                reject(error);
            })
        });
    }

    getLastAddedActivity(groupID,activityName){
        return new Promise((resolve, reject) => {
            this.groupRepository.getLastAddedActivity(groupID,activityName)
                .then(result => {
                    resolve(result[0].activity[result[0].activity.length - 1]);
                })
                .catch(error => { console.log(error);reject(error); })
        });
    }

    updateActivityInGroup(body,groupID){
        return new Promise((resolve, reject) => {
            const activity = {
                _id:body._id,
                name: body.name,
                users: body.users,
            };
            this.groupRepository.updateActivityInGroup(activity,groupID)
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

    addTimeslotForGroup(body,groupID){
        return new Promise((resolve,reject) => {
            this.groupRepository.addTimeslotForGroup(body,groupID)
                .then(result => {
                    this.getLastAddedTimeslot(groupID,body)
                        .then(result => { resolve(result) })
                        .catch(error => { reject(error); })
                })
                .catch(error => {
                    reject(error);
                })
        });
    }

    getLastAddedTimeslot(groupID,timeSlot){
        return new Promise((resolve, reject) => {
            this.groupRepository.getLastAddedTimeslot(groupID,timeSlot)
                .then(result => {
                    resolve(result[0].timeSlot[result[0].timeSlot.length - 1]);
                })
                .catch(error => { console.log(error);reject(error); })
        });
    }

    voteForTimeSlotInGroup(groupID,timeSlotID,userID){
        return new Promise((resolve,reject) => {
            this.groupRepository.voteForTimeSlotInGroup(groupID,timeSlotID,userID)
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }
    removeVoteForTimeSlotInGroup(groupID,timeSlotID,userID){
        return new Promise((resolve,reject) => {
            this.groupRepository.removeVoteForTimeSlotInGroup(groupID,timeSlotID,userID)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            })
        })
    }

    voteForActivityInGroup(groupID,activityID,userID){
        return new Promise((resolve,reject) => {
            this.groupRepository.voteForActivityInGroup(groupID,activityID,userID)
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }
    removeVoteForActivityInGroup(groupID,activityID,userID) {
        return new Promise((resolve,reject) => {
            this.groupRepository.removeVoteForActivityInGroup(groupID,timeSlotID,userID)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            })
        })
    }
    sendMessage(groupID,message) {
        return new Promise((resolve,reject) => {

            this.groupRepository.addMessageToGroup(groupID,message)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });

        });
    }
    getMessagesByGroupID(groupID) {
        return new Promise((resolve, reject) => {
            this.groupRepository.getMessagesByGroupID(groupID)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
        });
    }
};