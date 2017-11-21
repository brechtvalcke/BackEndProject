let glob = require("glob");

module.exports = function (app, passport) {

    glob.sync('routes/!(index).js').forEach((route) => {

        require("../"+route)(app, passport);
    });

    function apiNotFoundRes (req,res){
        res.status(404).send("path does not match an api route");
    }
    app.route('/api/*')
        .get(apiNotFoundRes)
};