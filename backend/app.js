const express = require('express');
const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server,{
    pingTimeout: 1000,
});


//cors setting 
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//app.use(express.static(__dirname + '/public'));

// localhost:3000서버에 접속하면 클라이언트로 파일을 열어줌
// app.get('/', function(req, res) {
//     res.sendFile('Chating App Server');
// });
  


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

      // 클라이언트에게 메시지를 전송
      //.broadcase. 자신을 제외한 나머지 클라이언트에게 메세지 전송
      socket.broadcast.emit('chat', rtnMessage);
  });


})

server.listen(3000, function() {
  console.log('socket io server listening on port 3000')
})