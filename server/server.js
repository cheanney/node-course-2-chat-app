const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
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
  // socket.emit from Admin text Welcome to the chat room
  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat room'));
  // socket.broadcast.emit from Admin to everyone in the chat room with text new user just joined
  socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));
  // server listening to createMessage from the client
  socket.on('createMessage', (message)=>{
    console.log('createMessage', message);
    // server send everyone who connect to the server the message
    io.emit('newMessage',generateMessage(message.from, message.text));
  });
  socket.on('disconnect', ()=>{
    console.log('User was disconnect');
  });
});
server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
