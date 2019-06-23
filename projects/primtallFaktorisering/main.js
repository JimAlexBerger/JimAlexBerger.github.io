window.onload = oppstart;

function oppstart(){
  document.getElementById("btn").onclick = main;
}

function main(){
  var number = parseInt(document.getElementById("input").value);
  var output = document.getElementById("output");
  var faktorisert = getFactors(number);


  output.innerHTML = "";
  var produkt = 1;

  for(faktor of faktorisert){
    output.innerHTML += faktor + " x ";
    produkt *= faktor;
  }

  output.innerHTML = output.innerHTML.slice(0,-2);
  output.innerHTML += "= " + produkt + "</br>" + speedTest(number).toFixed(5) + " ms";


}
