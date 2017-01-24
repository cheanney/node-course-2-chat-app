const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname,'../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('A new user connected');
  // socket.emit('newMessage',{
  //   from: 'John',
  //   text: 'See you then',
  //   createdAt: 124124
  // });
  // server listening to createMessage from the client
  socket.on('createMessage', (message)=>{
    console.log('createMessage', message);
    // server send everyone who connect to the server the message
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getDate()
    });
  });
  socket.on('disconnect', ()=>{
    console.log('User was disconnect');
  });
});
server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
