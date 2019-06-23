const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const valueDiv = document.getElementById("value");

const width = canvas.width / 4;
const height = canvas.height / 3;

const startValue = 3;
const baseLength = canvas.width/2.5;
const startAngle = 0;
const backgroundColor = "cornflowerblue"
const lineColor = "pink";
const lineWidth = 3;

let length = baseLength / startValue;
let pos = {
    x: width,
    y: height,
    dir: startAngle
}
rotate(Math.PI/4*startValue)

ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height)
dragon(startValue);
valueDiv.innerHTML = startValue;

document.getElementById("input").oninput = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    valueDiv.innerHTML = this.value;

    pos = {
        x: width,
        y: height,
        dir: startAngle
    }
    rotate(Math.PI/4*this.value)
    length = baseLength/(Math.sqrt(2)**(this.value-1));
    dragon(this.value);
}

function dragon(num) {
    if (num == 0)
        forward();
    else {
        dragon(num - 1);
        rotate(-Math.PI/2);
        nogard(num - 1);
    }
}

function nogard(num) {
    if (num == 0)
        forward();
    else {
        dragon(num - 1);
        rotate(Math.PI/2);
        nogard(num - 1);
    }
}

function forward() {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(pos.x, pos.y);

    //Kalkuler nye x og y
    pos.x = pos.x + Math.cos(pos.dir) * length;
    pos.y = pos.y + Math.sin(pos.dir) * length;

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke(); // Draw it
}

function rotate(angle) {
    pos.dir += angle;
    pos.dir %= Math.PI*2;
}
