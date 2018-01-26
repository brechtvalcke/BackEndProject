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
 
// connecting to mongoose and setting es6 promise as promise library 
mongoose.Promise = global.Promise; 
mongoose.connect(settings.mongoDb.getConnectionString(),{useMongoClient:true}); 
// setting socket io adapter for supporting multitenancy 
const redis = require('redis').createClient; 
const adapter = require('socket.io-redis'); 
const pub = redis(settings.redis.port, settings.redis.host, { auth_pass: settings.redis.password }); 
const sub = redis(settings.redis.port, settings.redis.host, { auth_pass: settings.redis.password }); 
io.adapter(adapter({ pubClient: pub, subClient: sub })); 
 
const socket = require("./socket")(app,io); 
 
const globalMiddelware = require("./middelware/globalMiddelware")(app, passport, cookieParser, bodyParser,helmet,compression,FacebookTokenStrategy); 
 
//routes 
const routes = require('./routes')(app, passport,io); 
 
app.use("/public", express.static(__dirname + '/public')); 
app.get("*", function (req, res) { 
    res.sendFile(__dirname + '/public/index.html'); 
}); 
 
server.listen(settings.express.port); 
