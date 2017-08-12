var socket;
var el = document.getElementById('c');
var ctx = el.getContext('2d');
var isDrawing;

socket = io.connect('http://localhost:3000');
socket.on('mouse', newDrawing);

function newDrawing(data){
    ctx.lineTo(data.x , data.y);
    ctx.stroke();
}

el.onmousedown = function(e) {
  isDrawing = true;
  ctx.moveTo(e.clientX, e.clientY);
};

el.onmousemove = function(e) {
  if (isDrawing) {
    ctx.lineTo(e.clientX, e.clientY);
    console.log(e.clientX, e.clientY);
    var data = {
        x: e.clientX,
        y: e.clientY
    }

    socket.emit('mouse', data);
    ctx.stroke();
  }
};

el.onmouseup = function() {
  isDrawing = false;
};  