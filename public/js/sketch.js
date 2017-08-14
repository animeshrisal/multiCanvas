var socket;
var el = document.getElementById('c');
var ctx = el.getContext('2d');
var isDrawing;
var colorPick = "#99ff99";
var colorChooser = document.getElementById('colorChooser');
var colorChanged = false;
var stopClosePathInfo = true;
socket = io.connect('http://localhost:3000');
socket.on('mouse', newDrawing);

var newColor = "#99ff99";
if(colorChooser){
  colorChooser.addEventListener('change', function(e){
    colorPick = colorChooser.value;
    console.log(colorPick);
    colorChanged = true;
    }, false);
}

function newDrawing(data){
  if(data.beginPathInfo == true && data.closePathInfo == false){
    ctx.beginPath();
  }  
  else if(data.beginPathInfo == false && data.closePathInfo == false){
      ctx.lineTo(data.x , data.y);
      ctx.strokeStyle = data.color;
      ctx.stroke();
  }else if(data.beginPathInfo == false && data.closePathInfo == true){
    ctx.closePath();
  }
}

el.onmousedown = function(e) {
  ctx.beginPath();
  isDrawing = true;
  ctx.moveTo(e.clientX, e.clientY);
  var data = {
      x: e.clientX,
      y: e.clientY,
      color: colorPick,
      beginPathInfo: true,
      closePathInfo: false 
  }

  socket.emit('mouse', data);
};

el.onmousemove = function(e) {
  if (isDrawing) {
    console.log(e.clientX, e.clientY);
    var data = {
        x: e.clientX,
        y: e.clientY,
        color: colorPick,
        beginPathInfo: false,
        closePathInfo: false
    }
    ctx.strokeStyle = colorPick;
    
    socket.emit('mouse', data);
    
    ctx.lineTo(e.clientX - 5, e.clientY - 5);
    ctx.stroke();
  }
};

el.onmouseup = function(e) {
  isDrawing = false;
  ctx.closePath();
  var data = {
        x: e.clientX,
        y: e.clientY,
        color: colorPick,
        beginPathInfo: false,
        closePathInfo: true
    }
  socket.emit('mouse', data);
};  