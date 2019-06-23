const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20,20,50,50);
ctx.stroke();

ctx.beginPath();
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.stroke();

ctx.beginPath();
ctx.rect(80,80,50,50);
ctx.stroke();
