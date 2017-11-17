let AuthorizationRepositorie = require('../repository/authorizationRepositorie');

module.exports = class AuthorizationService {
    constructor(){
        this.authorizationRepositorie = new AuthorizationRepositorie();
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