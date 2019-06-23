window.onload = oppstart;

function oppstart(){
  document.getElementById("antall").oninput = main;
  main();
}

function main() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    antall = parseInt(document.getElementById("antall").value);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log(antall);

    var p1 = {
            x: 5,
            y: 450
        },
        p2 = {
            x: 595,
            y: 450
        };

    koch(p1, p2, antall-1);

    function koch(p1, p2, antall) {
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;

        var lengde = Math.sqrt(dx * dx + dy * dy);
        var segment = lengde / 3;
        var vinkel = Math.atan2(dy, dx);

        var pA = {
            x: p1.x + dx / 3,
            y: p1.y + dy / 3
        };
        var pC = {
            x: p2.x - dx / 3,
            y: p2.y - dy / 3
        };
        var pB = {
            x: pA.x + Math.cos(vinkel - Math.PI / 3) * segment,
            y: pA.y + Math.sin(vinkel - Math.PI / 3) * segment
        };
        if (antall > 0) {
            koch(p1, pA, antall - 1);
            koch(pA, pB, antall - 1);
            koch(pB, pC, antall - 1);
            koch(pC, p2, antall - 1);
        } else {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.lineTo(pC.x, pC.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }
    }
}
