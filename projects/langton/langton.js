window.onload = oppstart;

var x_pos = 70;
var y_pos = 70;
var dir = 1; //0=høyre, 1=opp, 2=vesntre, 3=ned
var rules = [];
var loop;

function oppstart() {
    var ctx = document.getElementById("tegneflate").getContext("2d");

    ctx.fillStyle = "White";
    ctx.fillRect(0, 0, 700, 700);

    document.getElementById("start").onclick = startLoop;
    document.getElementById("stop").onclick = stopLoop;
    document.getElementById("restart").onclick = restart;
    document.getElementById("add").onclick = addRule;
    document.getElementById("eksempelSelect").onchange = addExample;



}

function startLoop() {

    loop = setInterval(draw, 1);


}

function stopLoop() {

    clearInterval(loop);

}

function restart() {
    clearInterval(loop);
    var ctx = document.getElementById("tegneflate").getContext("2d");

    ctx.fillStyle = "White";
    ctx.fillRect(0, 0, 700, 700);

    x_pos = 70;
    y_pos = 70;
    dir = 1; //0=høyre, 1=opp, 2=vesntre, 3=ned
    rules = [];

    document.getElementById('settings').innerHTML = null;




}

function addRule() {
    var color1 = document.getElementById("in1").value;
    var color2 = document.getElementById("out1").value;
    var direction = parseInt(document.getElementById("dirInput").value);

    rules[rules.length] = [color1, color2, direction];

    var directionText;


    switch (direction) {
        case 0:
            directionText = "Høyre";
            break;

        case 1:
            directionText = "Fram";
            break;

        case 2:
            directionText = "Venstre";
            break;

        case 3:
            directionText = "Tilbake";
            break;

        default:
            directionText = "error";
            break;

    }


    document.getElementById('settings').innerHTML += rulesHTML(color1, color2, directionText);


}

function addExample() {

    var selected = parseInt(document.getElementById("eksempelSelect").value)

    switch (selected) {
        case 0:
            restart();
            break;
        case 1:
            restart();
            for (var i = 0; i < 2; i++) {
                switch (i) {
                    case 0:
                        var color1 = "#ffffff";
                        var color2 = "#000000";
                        var direction = 0;
                        break;
                    case 1:
                        var color1 = "#000000";
                        var color2 = "#ffffff";
                        var direction = 2;
                        break;
                }


                rules[i] = [color1, color2, direction];

                var directionText;

                switch (direction) {
                    case 0:
                        directionText = "Høyre";
                        break;

                    case 1:
                        directionText = "Fram";
                        break;

                    case 2:
                        directionText = "Venstre";
                        break;

                    case 3:
                        directionText = "Tilbake";
                        break;

                    default:
                        directionText = "error";
                        break;

                }
                // console.log(color1);
                // console.log(color2);
                // console.log(directionText);
                document.getElementById('settings').innerHTML += rulesHTML(color1, color2, directionText);

            }
            break;
        case 2:
            restart();
            for (var i = 0; i < 3; i++) {
                switch (i) {
                    case 0:
                        var color1 = "#ffffff";
                        var color2 = "#000000";
                        var direction = 0;
                        break;
                    case 1:
                        var color1 = "#000000";
                        var color2 = "#0066ff";
                        var direction = 2;
                        break;
                    case 2:
                        var color1 = "#0066ff";
                        var color2 = "#ffffff";
                        var direction = 0;
                        break;
                }


                rules[i] = [color1, color2, direction];

                var directionText;

                switch (direction) {
                    case 0:
                        directionText = "Høyre";
                        break;

                    case 1:
                        directionText = "Fram";
                        break;

                    case 2:
                        directionText = "Venstre";
                        break;

                    case 3:
                        directionText = "Tilbake";
                        break;

                    default:
                        directionText = "error";
                        break;

                }
                // console.log(color1);
                // console.log(color2);
                // console.log(directionText);
                document.getElementById('settings').innerHTML += rulesHTML(color1, color2, directionText);

            }
            break;
        case 3:
            restart();
            for (var i = 0; i < 4; i++) {
                switch (i) {
                    case 0:
                        var color1 = "#ffffff";
                        var color2 = "#000000";
                        var direction = 2;
                        break;
                    case 1:
                        var color1 = "#000000";
                        var color2 = "#0066ff";
                        var direction = 2;
                        break;
                    case 2:
                        var color1 = "#0066ff";
                        var color2 = "#ff4400";
                        var direction = 0;
                        break;
                    case 3:
                        var color1 = "#ff4400";
                        var color2 = "#ffffff";
                        var direction = 0;
                        break;
                }


                rules[i] = [color1, color2, direction];

                var directionText;

                switch (direction) {
                    case 0:
                        directionText = "Høyre";
                        break;

                    case 1:
                        directionText = "Fram";
                        break;

                    case 2:
                        directionText = "Venstre";
                        break;

                    case 3:
                        directionText = "Tilbake";
                        break;

                    default:
                        directionText = "error";
                        break;

                }
                // console.log(color1);
                // console.log(color2);
                // console.log(directionText);
                document.getElementById('settings').innerHTML += rulesHTML(color1, color2, directionText);

            }
            break;
        case 4:
            restart();
            for (var i = 0; i < 9; i++) {
                switch (i) {
                    case 0:
                        var color1 = "#ffffff";
                        var color2 = "#000000";
                        var direction = 2;
                        break;
                    case 1:
                        var color1 = "#000000";
                        var color2 = "#0066ff";
                        var direction = 0;
                        break;
                    case 2:
                        var color1 = "#0066ff";
                        var color2 = "#ff4400";
                        var direction = 0;
                        break;
                    case 3:
                        var color1 = "#ff4400";
                        var color2 = "#006600";
                        var direction = 0;
                        break;
                    case 4:
                        var color1 = "#006600";
                        var color2 = "#123456";
                        var direction = 0;
                        break;
                    case 5:
                        var color1 = "#123456";
                        var color2 = "##ff00ff";
                        var direction = 0;
                        break;
                    case 6:
                        var color1 = "#ff00ff";
                        var color2 = "#ffccff";
                        var direction = 2;
                        break;
                    case 7:
                        var color1 = "#ffccff";
                        var color2 = "#339933";
                        var direction = 2;
                        break;
                    case 8:
                        var color1 = "#339933";
                        var color2 = "#ffffff";
                        var direction = 0;
                        break;

                }


                rules[i] = [color1, color2, direction];

                var directionText;

                switch (direction) {
                    case 0:
                        directionText = "Høyre";
                        break;

                    case 1:
                        directionText = "Fram";
                        break;

                    case 2:
                        directionText = "Venstre";
                        break;

                    case 3:
                        directionText = "Tilbake";
                        break;

                    default:
                        directionText = "error";
                        break;

                }
                // console.log(color1);
                // console.log(color2);
                // console.log(directionText);
                document.getElementById('settings').innerHTML += rulesHTML(color1, color2, directionText);

            }
            break;
        default:
            restart();
            break;
    }

}


function rulesHTML(color1, color2, dirText) {

    return ("<span>Hvis:</span><input type=\"color\" id=\"in1\" value=\"" + color1 + "\" disabled=\"true\"><span>Beveg:</span><select id=\"dirInput\" disabled=\"true\"><option value=0> " + dirText + " </option></select><span>Gjør ruten:</span><input type=\"color\" id=\"out1\" value=\"" + color2 + "\"disabled=\"true\"><br><br>");


}

function draw() {

    var ctx = document.getElementById("tegneflate").getContext("2d");
    // console.log(dir);
    switch (dir) {
        case 0:
            x_pos++;
            break;

        case 1:
            y_pos--;
            break;

        case 2:
            x_pos--;
            break;

        case 3:
            y_pos++;
            break;

        default:
            break;

    }

    var color = ctx.getImageData(x_pos * 5, y_pos * 5, 1, 1).data;




    for (i = 0; i < rules.length; i++) {
        // console.log(rules);
        if (color[0] === hexToRgb(rules[i][0]).r && color[1] === hexToRgb(rules[i][0]).g && color[2] === hexToRgb(rules[i][0]).b) {
            switch (rules[i][2]) {
                case 0:
                    dir--;
                    if (dir < 0) {
                        dir = 3;
                    }
                    break;

                case 2:
                    dir = (dir + 1) % 4;
                    break;
                case 3:
                    dir = (dir + 2) % 4;
                    if (dir > 3) {
                        dir = 0;
                    }
                    break;
                default:
                    break;
            }
            // console.log(dir);
            ctx.beginPath();
            ctx.rect(x_pos * 5, y_pos * 5, 5, 5)
            ctx.fillStyle = rules[i][1];
            ctx.fill();

        }
    }




}

//stjålet fra nettet
function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
