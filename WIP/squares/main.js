const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const valueDiv = document.getElementById("value");

const startValue = 3;

let width = canvas.width / 2;
let height = canvas.height / 2;
let size = Math.min(width, height);

ctx.fillStyle = "pink";
ctx.fillRect(0, 0, canvas.width, canvas.height)
drawSquare(width - size / 2, height - size / 2, size, startValue);
valueDiv.innerHTML = startValue;

document.getElementById("input").oninput = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "pink";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    valueDiv.innerHTML = this.value;
    drawSquare(width - size / 2, height - size / 2, size, this.value);
}

function drawSquare(x, y, size, num) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y, size, size);
    if (num > 0) {
        let tempSize = size / 2;
        drawSquare(x - tempSize / 2, y - tempSize / 2, tempSize, num - 1);
        drawSquare(x + size - tempSize / 2, y - tempSize / 2, tempSize, num - 1)
        drawSquare(x - tempSize / 2, y + size - tempSize / 2, tempSize, num - 1);
        drawSquare(x + size - tempSize / 2, y + size - tempSize / 2, tempSize, num - 1);
    }
}
