let glob = require("glob");

module.exports = function (app,dbPool,passport, redisClient) {

    glob.sync('routes/!(index).js').forEach((route) => {

        require("../"+route)(app,dbPool,passport, redisClient);
    });

    function apiNotFoundRes (req,res){
        console.log("api not found");
        res.status(404).send("path does not match an api route");
    }
    app.route('/api/*')
        .get(apiNotFoundRes)
};