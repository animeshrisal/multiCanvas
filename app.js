const express = require('express');
const path = require('path');
const socket = require('socket.io');
const app = express();
const server = app.listen(3000);

//Set static path
app.use(express.static(path.join(__dirname, 'public')));

const io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log('new connection:' + socket.id);
    socket.on('mouse', mouseMsg);

    function mouseMsg(data){
        socket.broadcast.emit('mouse', data);
        //io.socket.emit('mouse', data) goes back to same client as well
        console.log(data);
    }
}