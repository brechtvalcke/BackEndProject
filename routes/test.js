let GroupController = require('../controller/GroupController');
module.exports = function(app, passport) {
    let groupController = new GroupController();

    app.route("/api/test")
    .get( passport.authenticate('facebook-token', {session:false}),function(req,res){
        res.json(req.user);
    });

    app.route("/api/groups/:userID")
        .get(groupController.getGroups);
}