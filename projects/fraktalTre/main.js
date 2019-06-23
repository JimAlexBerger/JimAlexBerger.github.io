window.onload = oppstart;

function oppstart(){
  document.getElementById("antall").oninput = main;
  document.getElementById("vinkel").oninput = main;
  document.getElementById("faktor").oninput = main;


  main();
}

function main(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var antall = parseInt(document.getElementById("antall").value);
  var factor = parseFloat(document.getElementById("faktor").value);
  var grenVinkel = parseFloat(document.getElementById("vinkel").value);

  var p1 ={
    x: canvas.width/2,
    y:canvas.height
  },
  p2 = {
    x: canvas.width/2,
    y: 0
  };

  gren(p1,p2, antall);

  function gren(p1, p2, antall){
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    var lengde = Math.sqrt(dx*dx + dy*dy);
    var angle = Math.atan2(dy,dx);
    var grenLengde = lengde * (1 - factor);

    var pA = {
      x: p1.x + dx*factor,
      y: p1.y + dy*factor
    }
    var pB = {
      x: pA.x + Math.cos(angle + grenVinkel)*grenLengde,
      y: pA.y + Math.sin(angle + grenVinkel)*grenLengde
    }
    var pC = {
      x: pA.x + Math.cos(angle - grenVinkel)*grenLengde,
      y: pA.y + Math.sin(angle - grenVinkel)*grenLengde
    }

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(pA.x, pA.y);
    ctx.stroke();

    if(antall > 0){
      gren(pA, pC, antall - 1);
      gren(pA, pB, antall - 1);
    }
    else{
      ctx.beginPath();
      ctx.moveTo(pB.x,pB.y);
      ctx.lineTo(pA.x,pA.y);
      ctx.lineTo(pC.x,pC.y);
      ctx.stroke();
    }


  }
}
