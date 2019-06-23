window.onload = startup;

function startup() {

    document.getElementById("btnConvert").onclick = convert;

}

function convert() {

    var input = parseFloat(document.getElementById('input').value);

    document.getElementById("output").value = toBinary(input);

}


function toBinary(input) {

    var temp = "";
    var tempDes = ".";
    var count = 0;
    var heltall = Math.floor(input);
    var desimal = input - heltall

    console.log(heltall);
    console.log(desimal);

    if (heltall === 0) {
        temp = "0";
    } else {
        while (heltall > 0) {
            temp = String(heltall % 2) + temp;
            heltall = Math.floor(heltall / 2);
        }
    }


    while (desimal != 0) {

        desimal = desimal * 2;
        if (desimal >= 1) {
            tempDes = tempDes + "1";
            desimal = desimal - 1;
        } else {
            tempDes = tempDes + "0";
        }
    }


    return parseFloat(temp + tempDes);
}
