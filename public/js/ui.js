var messageButton = document.getElementById('messageButton')
var textarea = document.getElementById('messageField');
var chatWindow = document.getElementById('text');
var username
var registerName = document.getElementById('registerName');

var registerButton = document.getElementById('registerButton');
registerButton.disabled = true;

var message;
var socket = io.connect('http://localhost:3000');
socket.on('text', newMsg);
var wholeContainer = document.getElementById('wholeContainer');

function newMsg(data){
    if(data.joined == true){
        chatWindow.value += data.user + " has joined the chat\n"; 
    }else{
        chatWindow.value += data.user + ": " + data.sendMessage  + '\n';
        chatWindow.scrollTop = textarea.scrollHeight;
    }
}

registerName.onkeyup = function(){
    if(registerName.value == ""){
        registerButton.disabled = true;
        console.log(registerName.value);
    }else{
        registerButton.disabled = false;
    }
};

registerButton.addEventListener("click", function(){
    username = document.getElementById('registerName').value;
    document.getElementById('registerContainer').style.display = "none";
    chatWindow.value = username + "! Welcome to the chat\n";
    wholeContainer.style.display = "inline";
    var data = {
        user: username,
        joined: true
    }
    socket.emit('text', data);

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