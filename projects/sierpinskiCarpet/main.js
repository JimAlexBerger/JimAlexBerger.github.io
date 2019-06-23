window.onload = oppstart;

function oppstart(){
  document.getElementById("antall").oninput = render;
  render();
}

function render(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  var antall = parseInt(document.getElementById("antall").value)


  carpet(0,0, canvas.width, canvas.height, antall);

  function carpet(x1, y1, x2, y2, antall){
    var dx = x2 - x1;
    var dy = y2 - y1;

    if(antall > 1){
      carpet(x1 + dx/3 * 0, y1 + dy/3 * 0, x1 + dx/3 * 1, y1 + dy/3 * 1, antall - 1);
      carpet(x1 + dx/3 * 1, y1 + dy/3 * 0, x1 + dx/3 * 2, y1 + dy/3 * 1, antall - 1);
      carpet(x1 + dx/3 * 2, y1 + dy/3 * 0, x1 + dx/3 * 3, y1 + dy/3 * 1, antall - 1);
      carpet(x1 + dx/3 * 0, y1 + dy/3 * 1, x1 + dx/3 * 1, y1 + dy/3 * 2, antall - 1);
      carpet(x1 + dx/3 * 2, y1 + dy/3 * 1, x1 + dx/3 * 3, y1 + dy/3 * 2, antall - 1);
      carpet(x1 + dx/3 * 0, y1 + dy/3 * 2, x1 + dx/3 * 1, y1 + dy/3 * 3, antall - 1);
      carpet(x1 + dx/3 * 1, y1 + dy/3 * 2, x1 + dx/3 * 2, y1 + dy/3 * 3, antall - 1);
      carpet(x1 + dx/3 * 2, y1 + dy/3 * 2, x1 + dx/3 * 3, y1 + dy/3 * 3, antall - 1);

    }
    else{
      ctx.fillRect(x1 + dx/3 * 0, y1 + dy/3 * 0, dx/3, dx/3);
      ctx.fillRect(x1 + dx/3 * 1, y1 + dy/3 * 0, dx/3, dx/3);
      ctx.fillRect(x1 + dx/3 * 2, y1 + dy/3 * 0, dx/3, dx/3);
      ctx.fillRect(x1 + dx/3 * 0, y1 + dy/3 * 1, dx/3, dx/3);
      ctx.fillRect(x1 + dx/3 * 2, y1 + dy/3 * 1, dx/3, dx/3);
      ctx.fillRect(x1 + dx/3 * 0, y1 + dy/3 * 2, dx/3, dx/3);
      ctx.fillRect(x1 + dx/3 * 1, y1 + dy/3 * 2, dx/3, dx/3);
      ctx.fillRect(x1 + dx/3 * 2, y1 + dy/3 * 2, dx/3, dx/3);

    }
  }
}
