let ActivityService = require('../service/ActivityService');
const activityService = new ActivityService();
module.exports = class activityController{
    constructor(){}

    getAllActivities(req,res){
        activityService.getAllActivities()
            .then(result => {
                res.json({activityList:result});
            })
            .catch(error => {
                res.status(400);
                res.json({error: "something went wrong"})
            });
    }

    addActivity(req,res){
        activityService.addActivity(res.body)
            .then(result => {
                res.json({activityList:[result]});
            })
            .catch(error => {
                res.status(400);
                res.json({error: "something went wrong"})
            });
    }
};