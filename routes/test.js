module.exports = function(app, passport) {
    app.route("/api/test")
    .get( passport.authenticate('facebook-token', {session:false}),function(req,res){
        res.json(req.user);
    });

}