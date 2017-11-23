const GroupService = require('../service/GroupService');
const GroupModel = require('./../model/GroupModel');
const groupService = new GroupService();
module.exports = class GroupController {
    constructor(){
        
    }
    getMyGroups(req,res){
        groupService.getGroups(req.user.data._id)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json({error: "something went wrong"})
        })
    }
    addGroup(req,res){
        if(req.body.name === undefined || req.body.name === null || req.body.name === ""){
            const now = new Date();
            req.body.name= req.user.data.name + "'s event " + now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
        }
        let groupToCreate = new GroupModel({
            name: req.body.name,
            timeSlot: req.body.timeSlot,
            activity: req.body.activity,
            users: req.body.users,
            createBy: req.user.data._id,
            createdOn: new Date()
        });
        groupService.createGroup(groupToCreate)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json({error: "something went wrong"})
        })
    }
    getGroupById(req,res){
        groupService.getGroup(req.params.id).then(group => {
            res.json(group);
        }).catch(error => {
            res.json({error:"something went wrong"});
        })
    }

    updateGroupName(req,res){

    }
    getAllActivitiesForGroup(req,res){
        
    }
    addActivityForGroup(req,res){

    }
    updateActivityInGroup(req,res){

    }
    deleteActivityInGroup(req,res){

    }
    getAllTimeslotsForGroup(req,res){

    }
    addTimeslotForGroup(req,res){

    }
    updateTimeslotInGroup(req,res){

    }
    deleteTimeslotInGroup(req,res){

    }
    getMessages(req,res){
        
    }

}