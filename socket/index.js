
let settings = require('./../settings');

const handleNoAcces = (socket) => {
    console.log("user tried to do something he has no permission for");
    socket.disconnect();
};
const UserService = require("../service/UserService");
const userService = new UserService();
module.exports = function (app, io) {
   
    io.on('connection', function (socket) {
        socket.emit("connected");
        socket.on("auth",authData => {
            userService.getProfileWithToken(authData.acces_token)
            .then(fbProfile => {
                console.log(fbProfile);
                
            })
            .catch(error => {
                console.log(error);
            });
        });

    });

};