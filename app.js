const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require("fs");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression= require('compression');
const helmet = require('helmet');
const passport = require('passport');
const settings = require('./settings');
const FacebookTokenStrategy = require('passport-facebook-token');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(settings.mongoDb.getConnectionString(),{useMongoClient:true});


const redis = require('redis').createClient;
const adapter = require('socket.io-redis');
const pub = redis(13185, "redis-13185.c6.eu-west-1-1.ec2.cloud.redislabs.com", { auth_pass: "Win$4ever" });
const sub = redis(13185, "redis-13185.c6.eu-west-1-1.ec2.cloud.redislabs.com", { auth_pass: "Win$4ever" });
io.adapter(adapter({ pubClient: pub, subClient: sub }));

const globalMiddelware = require("./middelware/globalMiddelware")(app, passport, cookieParser, bodyParser,helmet,compression,FacebookTokenStrategy);


//routes
const routes = require('./routes')(app, passport); // params meegeven voor dependency injection (zorgen dat deze zaken maar 1 keer over de volledige node worden ingeladen)

// file routing here (can be put in a differend file if you like however this is the only functions you need for file serving)
app.use(express.static('public')); // this is middleware but belongs in file routing because this middelware gives acces to all files in public folder. This creates a file serving that works like apache.

app.get("*", function (req, res) {
    fs.createReadStream("./public/index.html").pipe(res);
});

app.listen(settings.express.port);

