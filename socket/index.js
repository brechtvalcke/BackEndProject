
let settings = require('./../settings');
const fs = require('fs');
const UserService = require("../service/UserService");
const userService = new UserService();
const groupService = new (require("../service/GroupService"))();

const handleNoAcces = (socket) => {
    console.log("user tried to do something he has no permission for");
};
const joinMyGroupRooms = (socket,io) => {
    groupService.getGroups(socket.user.data._id).then(groups => {
        io.of('/').adapter.remoteJoin(socket.id,socket.user.data._id,(err) => {
            if (err) console.log(err);
        });
        groups.forEach(group => {
            io.of('/').adapter.remoteJoin(socket.id, group._id, (err) => {
                if (err) { console.log(err);}
              });
        });
        socket.emit("groupsJoined",groups);
    }).catch(error => {
        console.log("could not fetch groups");
    })
};


module.exports = function (app, io) {
    io.on('connection', function (socket) {

        socket.emit("connected");
        socket.on("auth",authData => {
            if(typeof(authData) !== "object"){
                authData=JSON.parse(authData);
            }
            userService.getProfileWithToken(authData.acces_token)
            .then(fbProfile => {
                userService.getOrCreateUserOnLogin(fbProfile,authData.acces_token)
                .then( user => {
                    let reqUser = {
                        data:user,
                        accessToken:authData.acces_token,
                        fbProfile:fbProfile,
                    };
                    socket.user=reqUser;
                    socket.acces=true;
                    joinMyGroupRooms(socket,io);
                    socket.emit("authSucces");
                })
                .catch( error => {
                    console.log(error);
                    socket.acces=false;
                    socket.emit("authFailed");
                    socket.disconnect();
                });
                
            })
            .catch(error => {
                
            });
        });
        socket.on("message",(groupID, messageContent) => {
            
            if (socket.acces) {
                if(messageContent !== "" && messageContent){
            // TODO: check if user is member of group
                    let message = {
                        senderId: socket.user.data._id,
                        message: messageContent,
                        usersViewed: [],
                        dateSent : new Date(),
                    }
                    groupService.sendMessage(groupID,message).then(result => {

                        io.sockets.to(groupID).emit("message", message,groupID);
                        io.sockets.to(groupID).emit("messageNotification",message,groupID,message.senderId,groupID);
                    })
                    .catch(error => {
                        socket.emit("messageFailed",message);
                    })
                }

            } else {
                handleNoAcces(socket);
            }
        });
        socket.on("GetUsersInGroup", groupID => {
            if(socket.acces) {
                groupService.getUserObjectsByGroupId(groupID)
                .then(users => {
                    data = {
                        users:users,
                    }
                    socket.emit("usersForGroup",data);
                })
                .catch(error => console.log(error));
            }else{
                handleNoAcces(socket);
            }
        });
        socket.on("GetMessagesByGroupId", groupID => {
            if (socket.acces) {
                // check member of room
                memberOfGroup = false;
                groupService.getGroups(socket.user.data._id).then(groups => {
 
                    groups.forEach(group => {
                          if(group._id + "" === groupID){
                              memberOfGroup = true;
                          }
                    });
                    if(memberOfGroup){
                        groupService.getMessagesByGroupID(groupID)
                        .then(messages => {
                            data = {
                                _id:groupID,
                                messages: messages,
                            };
                            socket.emit("messagesOfGroupId", data);
                        })
                        .catch(err => {
                            socket.emit("GettingMessagesFailed",groupID);
                        });
                    }else{
                        handleNoAcces(socket);
                    }
                }).catch(error => {
                    console.log(error);
                })

            } else {
                handleNoAcces(socket);
            }
        });
        
    });

};