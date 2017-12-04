const ActivityController = require('../controllers/activityController');
const activityController = new ActivityController();
module.exports = function(app, passport) {
    const groupRoute = "/api/activity";

    app.route(groupRoute)
        .get(passport.authenticate('facebook-token', {session:false}),activityController.getAllActivities)
        .post(passport.authenticate('facebook-token', {session:false}),activityController.addActivity);
};
