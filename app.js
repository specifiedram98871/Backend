const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const port = 3000;
const app = express();

// socket.io requires an http server
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs"); // set view engine

// allow use of pictures, videos, css, js
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location",{id:socket.id , ...data});
    });
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
    });
});

app.get("/", function(req, res){
    res.render("index");
});

server.listen(port, () => console.log(`http://localhost:${port}`));
