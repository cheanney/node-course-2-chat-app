var socket = io();
socket.on('connect', function(){
  console.log('Server connected');
  // socket.emit('createMessage',{
  //   from: 'Anney',
  //   text: 'Hello'
  // });
});
socket.on('disconnect', function(){
  console.log('Server disconnect');
});
socket.on('newMessage', function(message){
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery("#messages").append(li);
});

socket.emit('',{
  from: 'Frank',
  text: 'Hi'
},function(data){
  console.log('Got it',data);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  },function(){

  });
  jQuery('[name=message]').val("");
});
