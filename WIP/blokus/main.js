setupBoard();

function setupBoard() {
  let gameDiv = document.getElementById("blokus");
  const tableSize = 20;

  let table = document.createElement("TABLE");
  for (var i = 0; i <= tableSize; i++) {
    let tr = document.createElement("TR");
    for (var j = 0; j <= tableSize; j++) {
      let td = document.createElement("TD");
      let name = i.toString(30) + j.toString(30);
      td.id = name;
      td.onclick = fillColor;
      tr.appendChild(td)
    }
    table.appendChild(tr);
  }
  gameDiv.appendChild(table);
}

function fillColor(element) {
  element.target.style.backgroundColor = "yellow";
}