const UserService = require('../service/UserService');
const userService = new UserService();
module.exports = class UserController {
    constructor() {
        
    };
    getMyFriends(req,res) {
        userService.getFriends(req.user.data._id)
        .then(friends => {
            res
            .status(200)
            .json({UserList:friends})
        })
        .catch(error => {
            res.status(400)
            .json({error:'Something went wrong'});
        });
    }

}