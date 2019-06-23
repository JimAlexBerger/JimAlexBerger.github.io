window.onload = oppstart;

maxIterations = 100;

function oppstart() {
    render(-2.5, 1, -1, 1);
}

function render(minX, maxX, minY, maxY) {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    var currY = 0;

    renderRow();

    function renderRow() {
        for (var currX = 0; currX <= width; currX++) {

            var x0 = fitInRange(currX, 0, canvas.width, minX, maxX);
            var y0 = fitInRange(currY, 0, canvas.height, minY, maxY);
            var x = 0.0;
            var y = 0.0;
            var iteration = 0;
            var tempX;

            while (x * x + y * y < 4 && iteration < maxIterations) {
                tempX = x * x - y * y + x0;
                y = 2 * x * y + y0;
                x = tempX;
                iteration++;
            }
            setPixel(ctx, currX, currY, iteration);
        }
        currY++;
        if (currY != height) {
            window.requestAnimationFrame(renderRow)
        }
    }
}

function fitInRange(valueIn, baseMin, baseMax, limitMin, limitMax) {
    return ((limitMax - limitMin) * (valueIn - baseMin) / (baseMax - baseMin)) + limitMin;
}

function rgb(r, g, b){
  return "rgb("+r+","+g+","+b+")";
}

function setPixel(ctx, x, y, iterations) {

    var t = ((iterations)/(maxIterations));
    ctx. fillStyle = rgb(parseInt(9 * (1 - t) * t * t * t * 255), parseInt(15 * (1 - t) * (1 - t) * t * t * 255), parseInt(8.5 * (1 - t) * (1 - t) * (1 - t) * t * 255));
    ctx.fillRect(x, y, 1, 1);
}
