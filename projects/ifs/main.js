window.onload = oppstart;

var running = false;
var counter = 0;

function oppstart() {
    document.getElementById("shape").oninput = main;
    document.getElementById("length").oninput = main;
    document.getElementById("skip").onchange = main;
    main();
}

function main() {
    counter = 1000;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);

    var shapePoint, nextShapePoint;
    var shape = parseInt(document.getElementById("shape").value);
    var length = parseFloat(document.getElementById("length").value);
    var angle = Math.PI * 2 / shape;
    var currAngle = angle;
    var nextAngle = angle;

    var notPrev = document.getElementById("skip").checked;
    console.log(document.getElementById("skip").checked);

    var point = {
        x: 0,
        y: 0
    };

    counter = 0;
    nextPoints();

    function nextPoints() {
        for (var i = 0; i < 120000; i++) {

            setPixel(ctx, point.x, point.y, "black");

            if (notPrev) {
                while (nextAngle == currAngle) {
                    nextAngle = angle * getRandom(0, shape - 1);
                }
            } else {
                nextAngle = angle * getRandom(0, shape - 1)
            }
            currAngle = nextAngle;

            var shapePoint = {
                x: Math.cos(nextAngle) * canvas.width / 2,
                y: Math.sin(nextAngle) * canvas.height / 2
            };

            var dx = shapePoint.x - point.x;
            var dy = shapePoint.y - point.y;



            point = {
                x: point.x + (dx * length),
                y: point.y + (dy * length)
            }
        }

        //if (counter < 500) {
        //    window.requestAnimationFrame(nextPoints);
        //}

    }

}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function setPixel(ctx, x, y, color) {

    ctx.fillStyle = color;
    ctx.fillRect(x, y, 0.5, 0.5);
}


//stjålet fra nett
function fraction(decimal){

	if(!decimal){
		decimal=this;
	}
	whole = String(decimal).split('.')[0];
	decimal = parseFloat("."+String(decimal).split('.')[1]);
	num = "1";
	for(z=0; z<String(decimal).length-2; z++){
		num += "0";
	}
	decimal = decimal*num;
	num = parseInt(num);
	for(z=2; z<decimal+1; z++){
		if(decimal%z==0 && num%z==0){
			decimal = decimal/z;
			num = num/z;
			z=2;
		}
	}
	//if format of fraction is xx/xxx
	if (decimal.toString().length == 2 &&
			num.toString().length == 3) {
                //reduce by removing trailing 0's
		decimal = Math.round(Math.round(decimal)/10);
		num = Math.round(Math.round(num)/10);
	}
	//if format of fraction is xx/xx
	else if (decimal.toString().length == 2 &&
			num.toString().length == 2) {
		decimal = Math.round(decimal/10);
		num = Math.round(num/10);
	}
	//get highest common factor to simplify
	var t = HCF(decimal, num);

	//return the fraction after simplifying it
	return ((whole==0)?"" : whole+" ")+decimal/t+"/"+num/t;
}
