const UserController = require('./../controllers/userController');
const userController = new UserController();
module.exports = function(app, passport,io) {
    const userRoute = "/api/user/";

    app.route(userRoute)
        .get(passport.authenticate('facebook-token', {session:false}),userController.getMyAccountInfo);

    app.route(userRoute + 'friends')
    .get(passport.authenticate('facebook-token', {session:false}),userController.getMyFriends);
}