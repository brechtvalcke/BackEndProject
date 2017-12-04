let ActivityModel = require('../model/ActivityModel');

module.exports = class ActivityRepository {
    constructor(){}

    getAllActivities(){
        return new Promise((resolve,reject) => {
            ActivityModel.find()
                .sort({
                    name: 'asc'
                })
                .exec((error, results) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(results);
                })
        });
    }

    addActivity(activity){
        return new Promise((resolve,reject) => {
            try {
                activity.save(error => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(true);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
};
