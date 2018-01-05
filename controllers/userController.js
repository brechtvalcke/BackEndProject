const UserService = require('../service/UserService');
const userService = new UserService();
const fs = require('fs');
var path = require('path');
global.appRoot = path.resolve(__dirname);
module.exports = class UserController {
    constructor() {
        
    };
    getMyAccountInfo(req,res){
        res.status(200).json(req.user.data)
    }
    getMyFriends(req,res) {
        userService.getFriends(req.user.data._id)
        .then(friends => {
            res
            .status(200)
            .json({userList:friends})
        })
        .catch(error => {
            res.status(400)
            .json({error:'Something went wrong'});
        });
    }

}