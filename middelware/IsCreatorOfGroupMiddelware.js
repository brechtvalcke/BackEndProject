const GroupService = require("./../service/GroupService");
const groupService = new GroupService();
module.exports = function(req,res,next) {
    let groupId;
    if(req.params.groupId){
        groupId = req.params.groupId;
    }else if(req.body.groupId) {
        groupId = req.body.groupId;
    }else{
        res.status(400);
        res.json({error:"groupId not set"});
    }
    groupService.getGroup(groupId)
    .then(group => {
        if(group.createBy === req.user.data._id){
            next();
        }else{
            res.status(403);
            res.json({error:"you dont have the rights to do this"});
        }
    })
    .catch(error => {
        res.status(400);
        res.json({error:"Error fetching group"});
    })
}