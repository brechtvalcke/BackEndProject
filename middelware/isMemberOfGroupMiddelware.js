const GroupService = require("./../service/GroupService");
const groupService = new GroupService();
module.exports = function (req, res, next) {
    let groupId;

    if (req.params.groupId) {
        groupId = req.params.groupId;
    } else if (req.body.groupId) {
        groupId = req.body.groupId;
    } else {
        res.status(400);
        res.json({error: "groupId not set"});
    }
    groupService.getGroup(groupId)
        .then(group => {
            let memberOfGroup = false;
            group[0].users.forEach(function (user) {

                if (user._id === req.user.data._id) {
                    memberOfGroup = true;
                }
            }, this);
            if (memberOfGroup) {
                next();
            } else {
                res.status(403);
                res.json({error: "Not a member of the group"});
            }
        })
        .catch(error => {
            res.status(400);
            console.log(error);
            res.json({error: "Error fetching group"});
        })
}