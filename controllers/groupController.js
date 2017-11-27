const GroupService = require('../service/GroupService');
const GroupModel = require('./../model/GroupModel');
const groupService = new GroupService();
module.exports = class GroupController {
    constructor(){
        
    }
    getMyGroups(req,res){
        groupService.getGroups(req.user.data._id)
        .then(result => {
            res.json({data:result});
        })
        .catch(error => {
            res.status(400);
            res.json({error: "something went wrong"})
        })
    }
    addGroup(req,res){
        if(req.body.name === undefined || req.body.name === null || req.body.name === ""){
            const now = new Date();
            req.body.name= req.user.data.name + "'s event " + now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
        }
        req.body.users.push({_id:req.user.data._id,accepted:true})
        let groupToCreate = new GroupModel({
            name: req.body.name,
            users: req.body.users,
            createBy: req.user.data._id,
            createdOn: new Date()
        });
        groupService.createGroup(groupToCreate)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(400);
            res.json({error: "something went wrong"})
        })
    }
    getGroupById(req,res){
        groupService.getGroup(req.params.id).then(group => {
            res.json(group);
        }).catch(error => {
            res.status(400);
            res.json({error:"something went wrong"});
        })
    }

    updateGroupName(req,res){
        groupService.updateGroupName(req.body.name,req.params.groupId)
        .then(result => {
            res.json({changed:true});
        })
        .catch(error => {
            res.status(400);
            res.json({error:"something went wrong"});
        })
    }
    getAllActivitiesForGroup(req,res){
        groupService.getAllActivitiesForGroup(req.params.groupId)
        .then(result => {
            res.json({data:result});
        })
        .catch(error =>{
            res.status(400);
            res.json({error:"something went wrong"});
        })
    }
    addActivityForGroup(req,res){
        groupService.addActivityForGroup(req.body,req.params.groupId,req.user.data._id)
        .then(result => {
            res.json({added:true});
        })
        .catch(error => {
            res.status(400);
            res.json({error:"something went wrong"});
        })
    }
    updateActivityInGroup(req,res){

    }
    updateActivityNameInGroup(req,res){

    }
    deleteActivityInGroup(req,res){

    }
    getAllTimeslotsForGroup(req,res){
        groupService.getAllTimeslotsForGroup(req.params.groupId)
        .then(result => {
            res.json({data:result});
        })
        .catch(error =>{
            res.status(400);
            res.json({error:"something went wrong"});
        })
    }
    addTimeslotForGroup(req,res){

    }
    updateTimeslotInGroup(req,res){

    }
    deleteTimeslotInGroup(req,res){

    }
    getMessages(req,res){

    }
    voteForActivityInGroup(req,res){}
    removeVoteForActivityInGroup(req,res){}
    updateTimeslotNameInGroup(req,res){}
    voteForTimeslotInGroup(req,res){}
    removeVoteForTimeslotInGroup(req,res){}
}