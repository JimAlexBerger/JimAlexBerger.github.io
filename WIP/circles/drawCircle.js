var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

drawCircles(30,c);
document.getElementById("input").onchange = function(){
    ctx.clearRect(0, 0, c.width, c.height);
    drawCircles(this.value, c);
}

function drawCircles(diff, canvas){
    radius = (Math.min(canvas.width,canvas.height) / 2) - diff;
    ctx = canvas.getContext("2d");
    var center = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };
    while (radius > 0){
        var angle = Math.random()*360;
        center.x += Math.cos(angle)*diff;
        center.y += Math.sin(angle)*diff;
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        ctx.fill();
        radius -= diff;
    }
}



function decimalToHexString(number) {
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }

    return "#" + number.toString(16).toUpperCase();
}
