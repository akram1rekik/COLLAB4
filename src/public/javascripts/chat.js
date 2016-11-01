/**
 * Created by mohamed on 20/04/2015.
 */
var socket = io.connect("http://192.168.1.4:8181");
var room='test';
if (room !== '') {
    console.log('Create or join room', room);
    socket.emit('create or join', room);
}
function send(){
    var t= document.getElementById('message').value;
    var b= document.getElementById('content');
    b.innerHTML+= '<b>'+ t + '</b><br>';
    socket.emit('message', t);
    console.log('Sending message: ', t);
}
socket.on('message', function (message){
    console.log("get message: " + message);
  var b= document.getElementById('content');
    b.innerHTML+=  '<b>'+ message + '</b><br>';
});