window.onload = oppstart;





function oppstart() {


    var canvas = document.getElementById('canvasMonteCarlo');
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, canvas.width, 0, Math.PI / 2);
    ctx.stroke();

    var loop = null;
    document.getElementById('output').value = 0;


    document.getElementById("btnStart").onclick = start;

    document.getElementById("btnStop").onclick = stop;

    document.getElementById("btnReset").onclick = reset;

}

function reset(){

  var canvas = document.getElementById('canvasMonteCarlo');
  var ctx = canvas.getContext("2d");

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(0, 0, canvas.width, 0, Math.PI / 2);
  ctx.stroke();

  inne = 0;
  ute = 0;

  document.getElementById('output').value = 0;


}

function stop(){

  clearInterval(loop);
}


function start() {

    loop = window.setInterval(draw, 1);
}

var inne = 0;
var ute = 0;

function draw() {
    var canvas = document.getElementById('canvasMonteCarlo');
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = 'black';

    var xRaw = Math.random();
    var yRaw = Math.random();

    var x = xRaw * canvas.width;
    var y = yRaw * canvas.height;

    ctx.fillRect(x, y, 1, 1);

    if (Math.pow(xRaw, 2) + Math.pow(yRaw, 2) < 1) {
        inne += 1;
    } else {
        ute += 1
    }

    document.getElementById('output').value = 4*(inne/(inne+ute));

}
