let GroupService = require('../service/GroupService');
let groupService;
module.exports = class GroupController {
    constructor() {
        groupService = new GroupService();
    };

    getGroups(req,res){
        let userID = req.params.userID;

        groupService.getGroups(userID)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(400).json(error));
    }
}