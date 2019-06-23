window.onload = oppstart;


function oppstart() {
    document.getElementById("antall").oninput = main;
    main();

}


function main() {
    var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        antall = parseInt(document.getElementById("antall").value),
        width = canvas.width,
        height = canvas.height;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(width / 2, height / 2);

    var p1 = {
            x: 0,
            y: -250
        },
        p2 = {
            x: 270,
            y: 150
        }
    p3 = {
        x: -270,
        y: 150
    };

    fraktal(p1, p2, p3, antall);

    function fraktal(p1, p2, p3, antall) {
        if (antall > 1) {
            var pA = {
                    x: (p1.x + p2.x) / 2,
                    y: (p1.y + p2.y) / 2
                },
                pB = {
                    x: (p2.x + p3.x) / 2,
                    y: (p2.y + p3.y) / 2
                },
                pC = {
                    x: (p3.x + p1.x) / 2,
                    y: (p3.y + p1.y) / 2
                };

            fraktal(p1, pA, pC, antall - 1);
            fraktal(pA, p2, pB, antall - 1);
            fraktal(pC, pB, p3, antall - 1);
        } else {
            tegnTrekant(p1, p2, p3);
        }

    }

    function tegnTrekant(p1, p2, p3) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.fill();
    }


}
