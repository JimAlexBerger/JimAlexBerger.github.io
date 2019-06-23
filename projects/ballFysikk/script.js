window.onload = oppstart;

function oppstart() {
    canvas = document.getElementById("canvas");
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);

    var ctx = canvas.getContext("2d");
    var r = 40;



    var balls = [];
    for (var i = 0; i < 10; i++) {
        var ball1 = new ball((canvas.width - 2 * r) * Math.random() + r, (canvas.height - 2 * r) * Math.random() + r, r, "coral", Math.PI * 2 * Math.random(), i+1);
        balls.push(ball1);
    }

    var loop = setInterval(function() {
        updateBkg(ctx, canvas);
        for (ball in balls) {
            balls[ball].draw(ctx);
            balls[ball].update(canvas);
        }
        ballCollision(balls);


    }, 25);

}

function ball(x, y, r, color, angle, speed) {
    this.position = {
        X: x,
        Y: y
    };
    this.radius = r;
    this.color = color;
    this.speed = speed;
    this.velocity = {
        dx: speed * Math.cos(angle),
        dy: speed * -Math.sin(angle)
    };

    this.update = function(canvas) {
        if (this.position.X + this.radius > canvas.width || this.position.X - this.radius < 0) {
            this.velocity.dx *= -1;
        }
        if (this.position.Y + this.radius > canvas.height || this.position.Y - this.radius < 0) {
            this.velocity.dy *= -1;
        }

        this.position.X += this.velocity.dx;
        this.position.Y += this.velocity.dy;
    }

    this.draw = function(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.X, this.position.Y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function ballCollision(balls) {
    var vector = {
        x: 0,
        y: 0
    };
    var tempVector = {
        x: 0,
        y: 0
    };
    var dist;
    var angle;

    for (var i = 0; i < balls.length; i++) {
        for (var j = i; j < balls.length; j++) {
            if (i != j) {
                vector.x = balls[j].position.X - balls[i].position.X;
                vector.y = balls[j].position.Y - balls[i].position.Y;
                dist = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
                angle = Math.atan2(vector.x,vector.y);

                if (dist <= balls[i].radius + balls[j].radius) {
                    tempVector.x = balls[i].velocity.dx;
                    tempVector.y = balls[i].velocity.dy;
                    balls[i].velocity.dx = balls[j].velocity.dx;
                    balls[i].velocity.dy = balls[j].velocity.dy;

                    balls[j].velocity.dx = tempVector.x;
                    balls[j].velocity.dy = tempVector.y;

                }
            }
        }
    }
}

function updateBkg(ctx) {
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);

    ctx.fillStyle = "CornflowerBlue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
