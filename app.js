let express = require("express");
let app = express();
let fs = require("fs");
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let compression= require('compression');
let helmet = require('helmet');
let passport = require('passport');
let settings = require('./settings');

let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

let globalMiddelware = require("./middelware/globalMiddelware")(app, passport, cookieParser, bodyParser,helmet,compression,JwtStrategy,ExtractJwt);

//routes
let routes = require('./routes')(app, passport); // params meegeven voor dependency injection (zorgen dat deze zaken maar 1 keer over de volledige node worden ingeladen)

// file routing here (can be put in a differend file if you like however this is the only functions you need for file serving)
app.use(express.static('public')); // this is middleware but belongs in file routing because this middelware gives acces to all files in public folder. This creates a file serving that works like apache.

app.get("*", function (req, res) {
    fs.createReadStream("./public/index.html").pipe(res);
});

app.listen(process.env.port || process.env.PORT || 80);

