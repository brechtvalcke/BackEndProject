const UserController = require('./../controllers/userController');
const userController = new UserController();
module.exports = function(app, passport) {
    const userRoute = "/api/user/";
    app.route(userRoute + 'friends')
    .get(passport.authenticate('facebook-token', {session:false}),userController.getMyFriends);
}