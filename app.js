var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(bodyParser.urlencoded({ extended: false }));

var nknm = '';

app.get('/index', function(req, res){
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/junwoo', function(req, res){
    nknm = "junwoo";
    res.sendFile(path.join(__dirname, 'views', 'room.html'));
});
app.get('/junsang', function(req, res){
    nknm = "junsang";
    res.sendFile(path.join(__dirname, 'views', 'room.html'));
});

io.on('connection', function(socket){
    io.to(socket.id).emit('enter the user', nknm);
    socket.on('send message', function(msgObj){
        io.emit('receive message', msgObj);
    });

    socket.on('enter the user', function(nknm){
        console.log(socket.id);
    });

    socket.on('disconnect', function(){
    })
});

http.listen(1111, function(){
  console.log('Connected 1111 port !!');
});
