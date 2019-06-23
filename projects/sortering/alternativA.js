window.onload = oppstart;
var array = [];
array[0] = [];
var i = 0;
var step = 0;
var size = 200;
var loop;
var delay;

function oppstart() {

    var canvas = document.getElementById("output");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    updateInfo();

    document.getElementById("start").onclick = start;
    document.getElementById("random").onclick = randomize;
    document.getElementById("play").onclick = play;
    document.getElementById("stop").onclick = stop;

    document.getElementById("antall").oninput = updateInfo;
    document.getElementById("fart").oninput = updateInfo;
    document.getElementById("option").onchange = updateInfo;
}

function stop() {
    clearTimeout(loop);
    document.getElementById("stop").disabled = true;
    document.getElementById("play").disabled = false;
    document.getElementById("random").disabled = false;
}

function play() {
    document.getElementById("stop").disabled = false;
    document.getElementById("play").disabled = true;
    document.getElementById("random").disabled = true;


    loop = setTimeout(function() {
        drawArray(array[i], "output");
        i++
        if (i < array.length) {
            play();
        } else {
            i = 0;
            document.getElementById("random").disabled = false;
            document.getElementById("play").disabled = false;


        }
    }, delay)
}

function start() {
    i = 0;
    var option = parseInt(document.getElementById("option").value);
    document.getElementById("start").disabled = true;
    document.getElementById("random").disabled = true;



    switch (option) {
        case 1:
            selectionSort();
            break;
        case 2:
            bubbleSort();
            break;
        case 3:
            quickSort(0, array[0].length - 1);
            break;
        case 4:
            mamma();
            break;
        default:
            console.log("error");
    }
    i = 0;
    step = 0;
    drawArray(array[array.length - 1], "output");
    document.getElementById("random").disabled = false;
    document.getElementById("play").disabled = false;

}

function randomize() {
    array = [];
    array[0] = [];
    i = 0;
    document.getElementById("play").disabled = true;
    document.getElementById("stop").disabled = true;
    document.getElementById("start").disabled = false;

    for (var i = 0; i < size; i++) {
        // temp[0] = Math.round(Math.random()*100);
        // temp[1] = "red";
        array[0][i] = [Math.round(Math.random() * 1000), "black"];
    }
    drawArray(array[0], "output");

}

function selectionSort() {
    //Finn laveste index
    var min = Infinity;
    var minIndex = 0;
    for (var j = i; j < array[0].length; j++) {
        step++;
        array[step] = array[step - 1].clone();
        array[step][j][1] = "yellow";

        step++;
        array[step] = array[step - 1].clone();
        array[step][minIndex][1] = "yellow";
        array[step][j][1] = "black";

        if (array[step][j][0] < min) {
            array[step][minIndex][1] = "black";
            min = array[step][j][0];
            minIndex = j;
        }
    }
    //Bytt Laveste index med i
    step++;
    array[step] = array[step - 1].clone();
    array[step][i][1] = "red";
    array[step][minIndex][1] = "red";

    step++;
    array[step] = array[step - 1].clone();
    array[step] = swap(array[step], i, minIndex);
    array[step][minIndex][1] = "black";
    array[step][i][1] = "green";

    i++;
    if (i < array[0].length) {
        selectionSort();
    }
}

function bubbleSort() {
    //hvis [i]>[i+1] bytt dem
    for (var j = 0; j < array[0].length - i - 1; j++) {
        step++;
        array[step] = array[step - 1].clone();
        array[step][j][1] = "yellow";
        array[step][j + 1][1] = "yellow";
        if (array[step][j][0] > array[step][j + 1][0]) {
            step++;
            array[step] = array[step - 1].clone();
            array[step][j][1] = "red";
            array[step][j + 1][1] = "red";
            array[step] = swap(array[step], j, j + 1);
        }
        step++;
        array[step] = array[step - 1].clone();
        array[step][j][1] = "black";
        array[step][j + 1][1] = "black";
    }
    step++;
    array[step] = array[step - 1].clone();
    array[step][array[0].length - i - 1][1] = "green";
    i++;
    if (i < array[0].length) {
        bubbleSort()
    }
}

function quickSort(min, max) {

    if (max - min > 0) {
        //Velg pivot
        var pivot = max;
        var wall = min;

        //Flytt alle mindre enn eller lik til venstre for pivot
        for (var j = min; j < max; j++) {
            step++;
            array[step] = array[step - 1].clone();
            array[step][pivot][1] = "yellow";
            array[step][j][1] = "yellow";

            if (array[step][j][0] <= array[step][pivot][0]) {
                step++;
                array[step] = array[step - 1].clone();
                array[step][j][1] = "red";
                array[step][wall][1] = "red";
                array[step] = swap(array[step], j, wall);

                step++;
                array[step] = array[step - 1].clone();
                array[step][j][1] = "black";
                array[step][wall][1] = "black";
                wall++;

            }
            step++;
            array[step] = array[step - 1].clone();
            array[step][j][1] = "black";
        }
        step++;
        array[step] = array[step - 1].clone();
        array[step] = swap(array[step], wall, pivot);
        array[step][pivot][1] = "black";
        array[step][wall][1] = "green";
        i++;

        if (min != wall) {
            quickSort(min, wall - 1);
        }
        if (max != wall) {
            quickSort(wall + 1, max);
        }



    } else {
        step++;
        array[step] = array[step - 1].clone();
        array[step][min][1] = "green";
    }
}

function mamma() {
    var tall = [];

    for (var j = 0; j < array[0].length; j++) {
        tall[array[step][j][0]] = (tall[array[step][j][0]] == null ? 1 : tall[array[step][j][0]] + 1);

        step++;
        array[step] = array[step - 1].clone();
        array[step][j][1] = "blue";
    }

    var index = 0;
    for (number in tall) {
        for (var k = 0; k < tall[number]; k++) {
            step++;
            array[step] = array[step - 1].clone();
            array[step][index][0] = number;
            array[step][index][1] = "green";
            index++;
        }
    }
}

function drawArray(array, canvasId) { //array: [i][0]=verdi [i][1] = farge
    var canvas = document.getElementById(canvasId)
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var bredde = canvas.width / array.length;
    var hoyde = canvas.height / getLargest(array);
    for (var i = 0; i < array.length; i++) {
        ctx.fillStyle = array[i][1];
        ctx.fillRect(i * bredde + bredde * 0.02, canvas.height - (array[i][0] * hoyde), bredde * 0.96, array[i][0] * hoyde);
    }



}

function getLargest(array) {
    var max = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] > max) {
            max = array[i][0];
        }
    }
    return max;
}

function sorteringsFunkjson(a, b) {
    if (a[0] === b[0])
        return 0;
    else {
        return (a[0] < b[0] ? -1 : 1);
    }
}

function swap(array, indexA, indexB) {
    var tempA = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = tempA;
    return array;
}

function updateInfo(evt) {
    var option = parseInt(document.getElementById("option").value);
    var tid = document.getElementById("time");
    var space = document.getElementById("space");
    var info = document.getElementById("info");
    var antall = document.getElementById("antall");
    var fart = document.getElementById("fart");
    var antallValue = parseInt(document.getElementById("antall").value);
    var fartValue = parseInt(document.getElementById("fart").value);
    var antallSpan = document.getElementById("antallSpan");
    var fartSpan = document.getElementById("fartSpan");



    fartSpan.innerHTML = fartValue + "ms";
    antallSpan.innerHTML = antallValue + "Søyler";
    size = antallValue;



    switch (option) {
        case 1:
            info.innerHTML = "Finner den miste og setter den på laveste plass som enda ikke er funnet";
            tid.innerHTML = "O(n^2)"
            space.innerHTML = "In place, bruker kun arrayet det er i."
            antall.setAttribute("max", 250);
            break;
        case 2:
            info.innerHTML = "Sammenligner to og to tall og bytter de om den til venstre er mindre enn den til høyre.";
            tid.innerHTML = "O(n^2)"
            space.innerHTML = "In place, bruker kun arrayet det er i."
            antall.setAttribute("max", 250);
            break;
        case 3:
            info.innerHTML = "velger en 'pivot' og flytter alle tall mindre til venstre og alle tall større til høre for pivot. Deretter gjør man samme prosessen med de 'mindre' og de 'større'.";
            tid.innerHTML = "O(n log n)"
            space.innerHTML = "In place, bruker kun arrayet det er i."
            antall.setAttribute("max", 700);
            break;
        case 4:
            info.innerHTML = "Teller hvor mange det er av hvert element og plasserer de i riktig rekkefølge.";
            tid.innerHTML = "O(n)"
            space.innerHTML = "bruker like mye minne som antall forskjellige elementer i arrayet"
            antall.setAttribute("max", 1000);
            break;
        default:
            info.innerHTML = "ERROR";
            tid.innerHTML = "ERROR"
            space.innerHTML = "ERROR"

    }
    if(evt ? evt.target!=fart:true){
      randomize();
    }
    else if(i > 0){
      stop()
      delay = fartValue;
      play();
    }
    else{
      delay = fartValue;
    }
}

//Stjålet fra nett http://stackoverflow.com/questions/2294703/multidimensional-array-cloning-using-javascript
Array.prototype.clone = function() {
    var arr = this.slice(0);
    for (var i = 0; i < this.length; i++) {
        if (this[i].clone) {
            //recursion
            arr[i] = this[i].clone();
        }
    }
    return arr;
}
