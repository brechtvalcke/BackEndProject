const GroupService = require('../service/GroupService');
const GroupModel = require('./../model/GroupModel');
let groupService;
module.exports = class GroupController {
    constructor(io){
        groupService = new GroupService(io);
    }
    getMyGroups(req,res){
        groupService.getGroups(req.user.data._id)
        .then(result => {
            res.json({groupList:result});
        })
        .catch(error => {
            res.status(400).json({error: "something went wrong"});
        })
    }
    getInvites(req,res){
        groupService.getInvites(req.user.data._id)
            .then(result => { res.json({groupList:result}); })
            .catch(error => { res.status(400).json({error: "something went wrong"}) })
    }

    acceptInvite(req,res){
        groupService.acceptInvite(req.params.groupId,req.user.data._id)
            .then(result => { res.json({changed:true}); })
            .catch(error => { res.status(400).json({error: "something went wrong"}) })
    }
    declineInvite(req,res){
        groupService.declineInvite(req.params.groupId,req.user.data._id)
            .then(result => { res.json({changed:true}); })
            .catch(error => { res.status(400).json({error: "something went wrong"}) })
    }

    addGroup(req,res){
        if(req.body.name === undefined || req.body.name === null || req.body.name === ""){
            const now = new Date();
            req.body.name= req.user.data.name + "'s event " + now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
        }
        let users = [];
        users.push({_id:req.user.data._id,accepted:true});
        req.body.users.forEach(user => {
            if(user._id !== req.user.data._id){
                users.push({_id:user._id, accepted:false});
            }
        });
        

        let groupToCreate = new GroupModel({
            name: req.body.name,
            users: users,
            createBy: req.user.data._id,
            createdOn: new Date()
        });
        groupService.createGroup(groupToCreate)
        .then(group => {
            res.json(group);
        })
        .catch(error => {
            res.status(400);
            res.json({error: "something went wrong"})
        });
    }
    getGroupById(req,res){
        groupService.getGroup(req.params.id).then(result => {
            res.json({groupList:result});
        }).catch(error => {
            res.status(400).json({error:"something went wrong"});
        })
    }

    updateGroupName(req,res){
        groupService.updateGroupName(req.body.name,req.params.groupId)
        .then(result => {
            res.json({changed:true});
        })
        .catch(error => {
            res.status(400).json({error:"something went wrong"});
        })
    }
    getAllActivitiesForGroup(req,res){
        groupService.getAllActivitiesForGroup(req.params.groupId)
        .then(result => {
            res.json({data:result});
        })
        .catch(error =>{
            res.status(400).json({error:"something went wrong"});
        })
    }
    addActivityForGroup(req,res){
        groupService.addActivityForGroup(req.body,req.params.groupId,req.user.data._id)
        .then(result => {
            res.json({activityList: [result] });
        })
        .catch(error => {
            res.status(400).json({error:"something went wrong"});
        })
    }

    getAllTimeslotsForGroup(req,res){
        groupService.getAllTimeslotsForGroup(req.params.groupId)
        .then(result => {
            res.json({data:result});
        })
        .catch(error =>{
            res.status(400).json({error:"something went wrong"});
        })
    }
    addTimeslotForGroup(req,res){
        groupService.addTimeslotForGroup(req.body,req.params.groupId)
            .then(result => {
                res.json({timeSlotList:[result]});
            })
            .catch(error =>{
                res.status(400).json({error:"something went wrong"});
            })
    }


    voteForActivityInGroup(req,res){
        groupService.voteForActivityInGroup(req.params.groupId,req.params.activityID,req.user.data._id)
            .then(result => {
                
                res.json({data:result});
            })
            .catch(error => {
                res.status(400).json({error:"something went wrong"});
            });
    }
    voteForTimeslotInGroup(req,res){
        groupService.voteForTimeSlotInGroup(req.params.groupId,req.params.timeslotID,req.user.data._id)
            .then(result => {
                res.json({data:result});
c            })
            .catch(error =>{
                res.status(400).json({error:"something went wrong"});
            });
    }

}