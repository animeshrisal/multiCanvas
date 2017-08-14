var messageButton = document.getElementById('messageButton')
var textarea = document.getElementById('messageField');
var chatWindow = document.getElementById('text');
var message;
var socket = io.connect('http://localhost:3000');
socket.on('text', newMsg);

function newMsg(data){
    chatWindow.value += data.sendMessage  + '\n';
}



messageButton.addEventListener("click", function(){
    var message = textarea.value;
    textarea.value = '';
    chatWindow.value += message + '\n';

    var data = {
        sendMessage: message
    }
    
    socket.emit('text', data);
}, false)