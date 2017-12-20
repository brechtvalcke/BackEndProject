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

const socket = require("./socket")(app,io);

const globalMiddelware = require("./middelware/globalMiddelware")(app, passport, cookieParser, bodyParser,helmet,compression,FacebookTokenStrategy);

//routes
const routes = require('./routes')(app, passport);

app.use("/public", express.static(__dirname + '/public'));
app.get("*", function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(settings.express.port);

