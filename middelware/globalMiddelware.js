let settings = require('./../settings');

module.exports = function (app,passport, cookieParser,bodyParser,helmet,compression,JwtStrategy,ExtractJwt) {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromHeader(settings.jwt.tokenHeader);
    opts.secretOrKey = settings.jwt.secret;
    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        let user = jwt_payload.user;

       //return if true
            return done(null, userObject);
            return false
            return done(null,false);
        
        // no acces
        // 
    }));
    
    app.use(passport.initialize());
    // Start compression (g-zip: verkleint files 3x ongeveer)
    app.use(compression());

    // gebruik van cookies mogelijk maken
    app.use(cookieParser());

    //deze middelware zorgt er voor dat app de body als json kan lezen
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // Using helmet to make app more secure ( dit zal kieran wel blij maken denkik)
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.use(helmet.hidePoweredBy());
}