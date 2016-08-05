var express    = require("express");
var http       = require("http");
var socketio   = require("socket.io");
var session    = require('express-session');

//var routes     = require('./routes/routes.js');
var app 	   = express();
var httpserver = http.createServer(app);
var io 		   = socketio(httpserver);

// Middlewares
app.use(express.static(__dirname+"/public"));
app.use(session({secret: "xpm#sfr", resave : true, saveUninitialized: false}));

io.on("connection",function(socket){
	console.log("Server socket on");
    socket.on("newMessage",function(msg){
        //console.log("New message received :"+msg);
        // Broadcast message to all users
        io.emit("newMessage",{"msg" : msg, "time" : Date.now()})
    });
});

// Listen server request on given port
// var port = process.env.PORT || 3000;
// app.listen(port,function(){
// 	console.log("Server started at port : "+port);
// });

httpserver.listen(process.env.PORT || 3000);