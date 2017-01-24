var socket = io();
socket.on('connect', function(){
  console.log('Server connected');
  socket.emit('createMessage',{
    from: 'Anney',
    text: 'Hello'
  });
});
socket.on('disconnect', function(){
  console.log('Server disconnect');
});
socket.on('newMessage', function(message){
  console.log('newMessage', message);
});
