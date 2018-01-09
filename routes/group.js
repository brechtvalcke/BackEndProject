const GroupController = require("./../controllers/groupController");
let groupController;
const isMemberOfGroupMiddelware = require("../middelware/isMemberOfGroupMiddelware");
const isCreatorOfGroupMiddelware = require("../middelware/IsCreatorOfGroupMiddelware");
module.exports = function(app, passport,io) {
    groupController = new GroupController(io);
    const groupRoute = "/api/group/";
    // global group routes
    app.route(groupRoute)
    .get(passport.authenticate('facebook-token', {session:false}),groupController.getMyGroups)
    .post(passport.authenticate('facebook-token', {session:false}),groupController.addGroup);

    app.route(groupRoute + "invites")
        .get(passport.authenticate('facebook-token', {session:false}),groupController.getInvites);

    app.route(groupRoute + "invites/:groupId/accepted")
        .put(passport.authenticate('facebook-token', {session:false}),groupController.acceptInvite);

    app.route(groupRoute + "invites/:groupId/decline")
        .delete(passport.authenticate('facebook-token', {session:false}),groupController.declineInvite);


    app.route(groupRoute + ":id")
    .get(passport.authenticate('facebook-token', {session:false}),groupController.getGroupById);


    app.route(groupRoute + "changeName/:groupId")
    .put(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.updateGroupName);
    // Activity Routes
    app.route(groupRoute + "activity/:groupId")
    .get(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.getAllActivitiesForGroup) // DONE
    .post(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.addActivityForGroup) //DONE


    app.route(groupRoute + "activity/vote/:groupId/:activityID")
    .put(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.voteForActivityInGroup) //TODO
    // Timeslot Routes
    app.route(groupRoute + "timeslot/:groupId")
    .get(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.getAllTimeslotsForGroup) //DONE
    .post(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.addTimeslotForGroup) //TODO

    app.route(groupRoute + "timeslot/vote/:groupId/:timeslotID")
    .put(passport.authenticate('facebook-token', {session:false}),isMemberOfGroupMiddelware,groupController.voteForTimeslotInGroup) //TODO


};
