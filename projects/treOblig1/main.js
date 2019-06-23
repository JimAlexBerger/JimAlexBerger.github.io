window.onload = oppstart;

function oppstart(){
  randTree('canvas', 0.90, 0, 5, 300, 90, 5)
}


function randTree(id, k, startY, branches, startX, angle, num) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext("2d");
    ctx.lineWidth = 3;



    if (startY === 0) {

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }

    // // Create gradient
    //   grd= ctx.createRadialGradient(startX, startX, 0.000, startX, startX, startX);
    //
    //   // Add colors
    //   grd.addColorStop(0.000, 'rgba(255, 238, 40, 1.000)');
    //   grd.addColorStop(0.200, 'rgba(255, 238, 40, 1.000)');
    //   grd.addColorStop(0.210, 'rgba(194, 66, 57, 1.000)');
    //   grd.addColorStop(0.400, 'rgba(194, 66, 57, 1.000)');
    //   grd.addColorStop(0.410, 'rgba(130, 194, 238, 1.000)');
    //   grd.addColorStop(0.600, 'rgba(130, 194, 238, 1.000)');
    //   grd.addColorStop(0.610, 'rgba(254, 254, 254, 1.000)');
    //   grd.addColorStop(0.780, 'rgba(254, 254, 254, 1.000)');
    //   grd.addColorStop(0.790, 'rgba(52, 50, 51, 1.000)');
    //   grd.addColorStop(0.990, 'rgba(52, 50, 51, 1.000)');
    //   grd.addColorStop(1.000, 'rgba(255, 255, 255, 1.000)');

    var grd = ctx.createLinearGradient(300, 600, 300, 0);
    // gradient.addColorStop("0", "blue");
    // gradient.addColorStop("1.0", "red");

    // gradient.addColorStop(0.000, 'rgba(41, 137, 204, 1.000)');
    // gradient.addColorStop(0.500, 'rgba(255, 255, 255, 1.000)');
    // gradient.addColorStop(0.520, 'rgba(144, 106, 0, 1.000)');
    // gradient.addColorStop(0.640, 'rgba(217, 159, 0, 1.000)');
    // gradient.addColorStop(1.000, 'rgba(255, 255, 255, 1.000)');

    // Add colors
    grd.addColorStop(0.150, 'rgba(255, 0, 0, 0.000)');
    grd.addColorStop(0.200, 'rgba(255, 0, 0, 1.000)');
    grd.addColorStop(0.320, 'rgba(255, 252, 0, 1.000)');
    grd.addColorStop(0.440, 'rgba(1, 180, 57, 1.000)');
    grd.addColorStop(0.560, 'rgba(0, 234, 255, 1.000)');
    grd.addColorStop(0.680, 'rgba(0, 3, 144, 1.000)');
    grd.addColorStop(0.800, 'rgba(255, 0, 198, 1.000)');
    grd.addColorStop(0.850, 'rgba(255, 0, 198, 0.000)');

    // gradient.addColorStop(0, 'rgba(Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256),1')
    // gradient.addColorStop(1, 'rgba(Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256),1')

    ctx.strokeStyle = grd;


    //ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';


    var nxtAngle = ((Math.random() * 40) + 5);
    var length = canvas.height / 3.5 * k;
    //console.log(k);
    var endX = startX + Math.cos((Math.PI * angle) / 180) * length;
    var endY = startY + Math.sin((Math.PI * angle) / 180) * length;


    ctx.beginPath();
    ctx.moveTo(startX, canvas.height - startY);
    ctx.lineTo(endX, canvas.height - endY);
    ctx.stroke();

    if (num > 0) {

        for (var n = 0; n < branches; n++) {
            randTree(id, k * k, endY, branches, endX, nxtAngle + n * ((180 - (nxtAngle * 2)) / (branches - 1)), num - 1);
        }
    }
}
