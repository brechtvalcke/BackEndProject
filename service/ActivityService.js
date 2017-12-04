let ActivityRepository = require('../repository/ActivityRepository');

module.exports = class ActivityService{
    constructor(){
        this.activityRepository = new ActivityRepository();
    }
    getAllActivities(){
        return new Promise((resolve,reject) => {
            this.activityRepository.getAllActivities()
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    addActivity(body){
        return new Promise((resolve,reject) => {
           this.activityRepository.addActivity(body)
               .then(result => {
                   resolve(result);
               })
               .catch(error => {
                   reject(error);
               });
        });
    }
};