const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const maxBalls = 10;
const ballRadius = 5;
const backgroundColor = "CornflowerBlue";

let ball = new Ball(canvas.width / 2, canvas.height / 2, 10, "pink");
let tree = generateTree(circleGenerator,[ball]);
renderBalls(tree,ctx);

function renderBalls(balls,ctx){
    balls.forEach(function(ball){
        ball.draw(ctx);
    });
}

function generateTree(generator,balls,width,height){
    let ballNum = 0;
    while(ballNum < maxBalls){
        let pos = generator();
        let ball = new Ball(pos.x,pos.y,ballRadius,"pink");
				
        balls = moveBall(ball, balls);
        ballNum++;
    }
    
    return balls;

    
}

function moveBall(ball, balls){
			if(!compare(ball, balls)){
					ball.move();
					if (ball.position.X + ball.radius > canvas.width || ball.position.X - ball.radius < 0) {
							ball = new Ball(pos.x,pos.y,ballRadius,"pink");
					}
					if (ball.position.Y + ball.radius > canvas.height || ball.position.Y - ball.radius < 0) {
							ball = new Ball(pos.x,pos.y,ballRadius,"pink");
					}
			}else{
				return balls.concat(ball);
			}
	renderBalls(balls.concat(ball),ctx)
	window.requestAnimationFrame(moveBall);
}

function compare(ball, balls){
		balls.forEach(function(ball2){
		let dist = Math.sqrt((ball.position.X - ball2.position.X)**2 + (ball.position.Y - ball2.position.Y)**2);
		if(dist < (ball.radius + ball2.radius)){
						return true;
				}
		});
		return false;
}

function Ball(x, y, r, color) {
    this.position = {
        X: x,
        Y: y
    };
    this.radius = r;
    this.color = color;


    this.move = function() {
        this.position.X += Math.random()*-2+1;
        this.position.Y += Math.random()*-2+1;
    }

    this.draw = function(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.X, this.position.Y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function circleGenerator(){
    let  angle = Math.random()*Math.PI*2;
    return {
        x: canvas.width/2 + Math.cos(angle)*canvas.width/2-ballRadius*2,
        y: canvas.height/2 + Math.sin(angle)*canvas.height/2-ballRadius*2
    }
}
