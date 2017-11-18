let AuthorizationRepositorie = require('../repository/AuthorizationRepositorie');

module.exports = class AuthorizationService {
    constructor(){
        this.authorizationRepositorie = new AuthorizationRepositorie();
    }

    doesUserExist(userID) {
        return new Promise((resolve,reject)=>{
            this.authorizationRepositorie.doesUserExist(userID)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }

    canUserAccessGroup(userID,GroupID){
        return new Promise((resolve,reject)=>{
            this.authorizationRepositorie.canUserAccessGroup(userID,GroupID)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }

    isUserAdminOfGroup(userID,GroupID){
        return new Promise((resolve,reject)=>{
            this.authorizationRepositorie.isUserAdminOfGroup(userID,GroupID)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }
};