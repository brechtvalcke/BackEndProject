const GroupController = require("./../controllers/groupController");
const groupController = new GroupController();
const isMemberOfGroupMiddelware = require("../middelware/isMemberOfGroupMiddelware");
const isCreatorOfGroupMiddelware = require("../middelware/IsCreatorOfGroupMiddelware");
module.exports = function(app, passport) {
    const groupRoute = "/api/group/";
    // global group routes
    app.route(groupRoute)
    .get(passport.authenticate('facebook-token', {session:false}),groupController.getMyGroups)
    .post(passport.authenticate('facebook-token', {session:false}),groupController.addGroup);
    
    app.route(groupRoute + ":id")
    .get(passport.authenticate('facebook-token', {session:false}),groupController.getGroupById);

    app.route(groupRoute + "changeName/:groupId")
    .put(passport.authenticate('facebook-token', {session:false}),isCreatorOfGroupMiddelware,groupController.updateGroupName);
    // Activity Routes
    app.route(groupRoute + "activity/:groupId")
    .get(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.getAllActivitiesForGroup) // DONE
    .post(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.addActivityForGroup) //DONE
    .delete(passport.authenticate('facebook-token', {session:false}),isCreatorOfGroupMiddelware,groupController.deleteActivityInGroup); //TODO

    app.route(groupRoute + "activity/changeName/:groupId/:activityID")
    .put(passport.authenticate('facebook-token', {session:false}),isCreatorOfGroupMiddelware,groupController.updateActivityNameInGroup); //TODO

    app.route(groupRoute + "activity/vote/:groupId/:activityID")
    .put(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.voteForActivityInGroup) //TODO
    .delete(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.removeVoteForActivityInGroup); //TODO
    // Timeslot Routes
    app.route(groupRoute + "timeslot/:groupId")
    .get(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.getAllTimeslotsForGroup) //DONE
    .post(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.addTimeslotForGroup) //TODO
    .delete(passport.authenticate('facebook-token', {session:false}),isCreatorOfGroupMiddelware,groupController.deleteTimeslotInGroup); //TODO

    app.route(groupRoute + "timeslot/changeName/:groupId/:timeslotID")
    .put(passport.authenticate('facebook-token', {session:false}),isCreatorOfGroupMiddelware,groupController.updateTimeslotNameInGroup); //TODO

    app.route(groupRoute + "timeslot/vote/:groupId/:timeslotID")
    .put(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.voteForTimeslotInGroup) //TODO
    .delete(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.removeVoteForTimeslotInGroup); //TODO
    // message Routes
    app.route(groupRoute + "message/:groupId")
    .get(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.getMessages); //TODO

};
