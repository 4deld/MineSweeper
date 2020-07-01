const express = require('express');
const app = express();

const server = require('http').Server(app);

var io = require('socket.io').listen(server);

// const io = require('socket.io')(server,{
//     pingTimeout: 1000,
// });


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
  res.sendFile('Hellow Chating App Server');
});
  
io.on('connection' , function(socket) {
  console.log('Connect from Client: '+socket)

  socket.on('hello', function(data){
      console.log('hello from Client: '+data)
  });

  socket.on('chat', function(data){
      console.log('message from Client: '+data.message)

      var rtnMessage = {
          message: data.message
      };

      // 클라이언트에게 메시지를 전송한다
      socket.broadcast.emit('chat', rtnMessage);
  });


})

server.listen(3000, function() {
  console.log('socket io server listening on port 3000')
})