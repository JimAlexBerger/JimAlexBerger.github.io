const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = ctx.canvas.width;
const height = ctx.canvas.height;

const radius = Math.min(width/2,height/2);

//cardiod(0,2,0)
oppstart();

function oppstart() {
    document.getElementById("pow").oninput = main;
    document.getElementById("prod").oninput = main;
    document.getElementById("add").oninput = main;
    main();
}

function main(){
    clearCanvas();
    let pow = Number.parseFloat(document.getElementById("pow").value);
    let prod = Number.parseFloat(document.getElementById("prod").value);
    let add = Number.parseFloat(document.getElementById("add").value);
    document.getElementById("formula").innerHTML = "index ** " + pow + " + index * " + prod + " + " + add;
    //console.log(typeof(pow),prod,add);
    cardiod(pow,prod,add);
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(width/2, height/2,radius , 0, 2 * Math.PI);
    ctx.stroke();
}

function cardiod(a,b,c){
    const numPoints = 1000;
    const unitAngle = (Math.PI*2)/numPoints;

    let mapFunc = (pointNum => pointNum**a + pointNum*b + c);

    for(let i = 0;i < numPoints; i++){
        drawFromAngleToAngle(unitAngle*i,unitAngle*mapFunc(i))   
    }
}

function drawFromAngleToAngle(angle1,angle2){
    ctx.beginPath();
    let point1 = getPointOnCircle(angle1,radius);
    let point2 = getPointOnCircle(angle2,radius);
    ctx.moveTo(width/2 - point1.x,height/2 - point1.y);
    ctx.lineTo(width/2 - point2.x,height/2 - point2.y);
    ctx.stroke();
}

function getPointOnCircle(angle, radius){
    x = Math.cos(angle) * radius;
    y = Math.sin(angle) * radius;
    return {x,y}
}