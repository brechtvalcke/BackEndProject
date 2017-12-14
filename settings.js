
module.exports = {
    express:{
        port:process.env.PORT || 80
    },
    facebookAuth: {
        FACEBOOK_APP_ID:"397459757339390",
        FACEBOOK_APP_SECRET:"2e1bb38c2dfa65b7cf06770ab24da0da",
    },
    stringIDgenerator: {
        length: 12
    },
    mongoDb :{
        username: "MeetMe",
        password: "nXhpkTPoQmpJsWPS",
        dbName: "MeetMe",
        getConnectionString: function(){
           return "mongodb://"+this.username+":"+ this.password +"@meetme-shard-00-00-u195e.mongodb.net:27017,meetme-shard-00-01-u195e.mongodb.net:27017,meetme-shard-00-02-u195e.mongodb.net:27017/"+this.dbName+"?ssl=true&replicaSet=MeetMe-shard-0&authSource=admin"
        } 
    }
};
