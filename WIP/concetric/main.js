const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = ctx.canvas.width;
const height = ctx.canvas.height;

const maxRadius = ((width/2)**2 + (height/2)**2)**+.5;
const minRadius = 5;
const radiusDiff = 7;
const randMagnitude = 1.2;
const randSpeed = 1.5;

const resolution = 0.01;

let offsets = {};

noise.seed(Math.random());
for(let i = 0; i < Math.PI * 2; i += resolution){
    point = getPointOnCircle(i,randSpeed)
    offsets[i] = (noise.simplex2(point.x, point.y) + 1) * randMagnitude;
}

for(let radius = minRadius; radius < maxRadius; radius += radiusDiff){
    ctx.beginPath()
    let startpoint = getPointOnCircle(0,radius + offsets[0]);
    ctx.moveTo(width/2 - startpoint.x,height/2 - startpoint.y);
    //noise.seed(Math.random());
    for(let i = 0; i < Math.PI * 2; i += resolution){
        let point = getPointOnCircle(i,radius + offsets[i]);
        offsets[i] *= randMagnitude;
        //offsets[i] += (noise.simplex2(i, 0) + 1) * randMagnitude;
        //offsets[i] = Math.min(Math.max(offsets[i], -radiusDiff), radiusDiff);
        ctx.lineTo(width/2 - point.x,height/2 - point.y);
    }
    ctx.closePath();
    ctx.stroke();
}

function drawFromAngleToAngle(angle1,angle2, radius1,radius2){
    ctx.beginPath();
    let point1 = getPointOnCircle(angle1,radius1);
    let point2 = getPointOnCircle(angle2,radius2);
    ctx.moveTo(width/2 - point1.x,height/2 - point1.y);
    ctx.lineTo(width/2 - point2.x,height/2 - point2.y);
    ctx.stroke();
}

function getPointOnCircle(angle, radius){
    x = Math.cos(angle) * radius;
    y = Math.sin(angle) * radius;
    return {x,y}
}