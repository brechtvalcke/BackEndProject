const settings = require('./../settings');
const UserService = require('./../service/UserService');

const userService = new UserService();
module.exports = function (app,passport, cookieParser,bodyParser,helmet,compression,FacebookTokenStrategy) {

    passport.use(new FacebookTokenStrategy({
        clientID: settings.facebookAuth.FACEBOOK_APP_ID,
        clientSecret: settings.facebookAuth.FACEBOOK_APP_SECRET
      }, function(accessToken, refreshToken, profile, done) {
        // query for user here and send user param

        userService.getOrCreateUserOnLogin(profile,accessToken)
        .then( user => {
            let reqUser = {
                data:user,
                accessToken:accessToken,
                refreshToken:refreshToken,
                fbProfile:profile,
            }
            return done(false, reqUser);
        })
        .catch( error => {
            return done(error,false);
        });

        
      }
    ));
    
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

    // Using helmet to make app more secure
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.use(helmet.hidePoweredBy());
}