window.onload = oppstart;

function oppstart(){
  document.getElementById("btn").onclick = main;
  document.getElementById("faktor").onchange = main;
  document.getElementById("border").onchange = main;
  main();
}

function main() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    var faktor = parseInt(document.getElementById("faktor").value);
    var border = parseInt(document.getElementById("border").value);
    var border = -150;


    var point = {
        y: 0,
        x: 0
    }

    for (; point.x < canvas.width; point.x++) {
        point.y += Math.random() * faktor - faktor / 2;

        for (var i = border; i + border < canvas.height; i += 5) {
            setPixel(ctx, point.x, point.y + i, i, canvas.height);
        }
    }


}

function setPixel(ctx, x, y, iterations, maxIterations) {

    var t = ((iterations)/(maxIterations));
    ctx. fillStyle = rgb(parseInt(9 * (1 - t) * t * t * t * 255), parseInt(15 * (1 - t) * (1 - t) * t * t * 255), parseInt(8.5 * (1 - t) * (1 - t) * (1 - t) * t * 255));
    ctx.fillRect(x, y, 1, 1);
}

function rgb(r, g, b){
  return "rgb("+r+","+g+","+b+")";
}
