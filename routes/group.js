const GroupController = require("./../controllers/groupController");
const groupController = new GroupController();
const isMemberOfGroupMiddelware = require("../middelware/isMemberOfGroupMiddelware");
module.exports = function(app, passport) {
    const groupRoute = "/api/group/";
    
    app.route(groupRoute)
    .get(passport.authenticate('facebook-token', {session:false}),groupController.getMyGroups)
    .post(passport.authenticate('facebook-token', {session:false}),groupController.addGroup)
    
    app.route(groupRoute + ":id")
    .get(passport.authenticate('facebook-token', {session:false}),groupController.getGroupById);

    app.route(groupRoute + "changeName/:groupId")
    .put(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.updateGroupName);

    app.route(groupRoute + "activity/:groupId")
    .get(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.getAllActivitiesForGroup)
    .post(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.addActivityForGroup)
    .put(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.updateActivityInGroup)
    .delete(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.deleteActivityInGroup);

    app.route(groupRoute + "timeslot/:groupId")
    .get(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.getAllTimeslotsForGroup)
    .post(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.addTimeslotForGroup)
    .put(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.updateTimeslotInGroup)
    .delete(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.deleteTimeslotInGroup);

    app.route(groupRoute + "message/:groupId")
    .get(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.getMessages);
}