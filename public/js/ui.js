var messageButton = document.getElementById('messageButton')
var textarea = document.getElementById('messageField');
var chatWindow = document.getElementById('text');
var username
var registerButton = document.getElementById('registerButton');
var message;
var socket = io.connect('http://localhost:3000');
socket.on('text', newMsg);
var wholeContainer = document.getElementById('wholeContainer');


function newMsg(data){
    chatWindow.value += data.user + ": " + data.sendMessage  + '\n';
    chatWindow.scrollTop = textarea.scrollHeight;

}

registerButton.addEventListener("click", function(){
    username = document.getElementById('username').value;
    document.getElementById('registerContainer').style.display = "none";
    chatWindow.value = username + "! Welcome to the chat\n";
    wholeContainer.style.display = "inline";  
}, false);


messageButton.addEventListener("click", function(){
    var message = textarea.value;
    textarea.value = '';

    var data = {
        user: username,
        sendMessage: message
    }
    
    chatWindow.value += data.user + ": " + data.sendMessage  + '\n';
    chatWindow.scrollTop = textarea.scrollHeight;
    socket.emit('text', data);
}, false)