const express = require('express');
const app = express();
const server = require('http').Server(app);
var io = require('socket.io').listen(server);
// const io = require('socket.io')(server,{
//     pingTimeout: 1000,
// });


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {

    res.sendFile(__dirname + '/index.html');
  
  });
  
  io.on('connection', function (socket) {

    console.log('a user connected');
  
    socket.on('disconnect', function () {
  
      console.log('user disconnected');
  
    });
  
  });

server.listen(3000);