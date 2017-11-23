const GroupService = require("./../service/GroupService");
const groupService = new GroupService();
module.exports = function(req,res,next) {
    let groupId;
    if(req.params.groupId){
        groupId = req.params.groupId;
    }else if(req.body.groupId) {
        groupId = req.body.groupId;
    }else{
        res.json({error:"groupId not set"});
    }
    groupService.getGroup(groupId)
    .then(group => {
        const memberOfGroup = false;
        group.users.forEach(function(user) {
            if(user._id === req.user.data._id){
                memberOfGroup = true;
            }
        }, this);
        if(memberOfGroup){
            next();
        }else{
            res.json({error:"Not a member of the group"});
        }
    })
    .catch(error => {
        res.json({error:"Error fetching group"});
    })
}