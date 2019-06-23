window.onload = oppstart;

function oppstart() {
    var output = document.getElementById("output");
    var button = document.createElement("BUTTON");
    button.onclick = multiply;
    button.innerHTML = 2;
    output.appendChild(button);
    for ( var i = 3; i < 100000; i+=2 ) {
        if ( isPrime(i) ) {
          var button = document.createElement("BUTTON");
          button.onclick = multiply;
          button.innerHTML = i;
          output.appendChild(button);
        }
    }
}

function multiply() {
    document.getElementById("input").value = parseInt(document.getElementById("input").value) * parseInt(this.innerHTML);
}
