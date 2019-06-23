//Generere sudoku brett
let gameDiv = document.getElementById("sudoku");
let table = document.createElement("TABLE");
for (var i = 0; i <= 8; i++) {
    let tr = document.createElement("TR");
    for (var j = 0; j <= 8; j++) {
        let td = document.createElement("TD");
        td.contentEditable = "true";
        td.innerHTML = "  ";
        td.align = "center";
        td.type = "number";
        td.step = "0.01"
        let name = i + "" + j;
        td.id = name;
        tr.appendChild(td)
    }
    table.appendChild(tr);
}
gameDiv.appendChild(table);

document.getElementById("solve").onclick = solve;

function solve() {
    let sudoku = [];
    for (var row = 0; row <= 8; row++) {
        sudoku[row] = [];
        for (var col = 0; col <= 8; col++) {
            sudoku[row][col] = parseInt(document.getElementById(row + "" + col).innerHTML);
        }
    }
    var time = performance.now();
    sudoku = solveEasy(sudoku);
    sudoku = solveRecursive(sudoku,0,0);
    time = performance.now() - time;
    displaySudoku(sudoku);
    document.getElementById("time").innerHTML = time + " ms";
}

function displaySudoku(sudoku) {
    for (var row in sudoku) {
        for (var col in sudoku[row]) {
            if (sudoku[row][col]) {
                document.getElementById(row + "" + col).innerHTML = sudoku[row][col];
            }
        }
    }
}

function solveEasy(sudoku) {
    let solved = 0;
    do {
        solved = 0;
        for (var row = 0; row < sudoku.length; row++) {
            for (var col = 0; col < sudoku[row].length; col++) {
                //Sjekke om er tom rute
                if (!sudoku[row][col]) {
                    var possible = getPossible(sudoku, row, col);

                    if (possible.length == 1) {
                        sudoku[row][col] = parseInt(possible[0]);
                        solved++;
                    }
                }
            }
        }
    } while (solved != 0);
    return sudoku;
}

function solveRecursive(sudoku, row, col) {
    this.finished = false;

    //Hvis siste ruten
    var last = false;
    if (row === 8 && col === 8) {
        last = true;
    }

    //Neste grid
    let nextRow = (col === 8 ? row+1 : row);
    let nextCol = (col === 8 ? 0 : col+1);
    //Hvis det er noe i ruten
    if (sudoku[row][col]) {
        if (!last) {
            sudoku = solveRecursive(sudoku, nextRow, nextCol);
        } else {
            this.finished = true;
        }
    }
    //Ikkeno i ruten
    else {
        //Mulige tall
        let possible = getPossible(sudoku, row, col);

        if (possible.length !== 0) {
            for (var possibleNum of possible) {
                if (this.finished !== true) {
                    sudoku[row][col] = possibleNum;
                    if (!last) {
                        sudoku = solveRecursive(sudoku, nextRow, nextCol);
                    } else {
                        this.finished = true;
                    }
                }
            }
            if(!this.finished){
                sudoku[row][col] = null;
            }
        }
    }

    return sudoku;
}

function getPossible(sudoku, row, col) {
    var possible = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    //sjekke raden
    for (var num of sudoku[row]) {
        var i = possible.indexOf(num);
        if (i != -1) {
            possible.splice(i, 1);
        }
    }

    //sjekke kolonenn
    for (var j = 0; j < sudoku.length; j++) {
        var i = possible.indexOf(sudoku[j][col]);
        if (i != -1) {
            possible.splice(i, 1);
        }
    }

    //Sjekker ruten
    var minCol = Math.floor(col / 3) * 3;
    var minRow = Math.floor(row / 3) * 3;
    for (var j = minRow; j < minRow + 3; j++) {
        for (var k = minCol; k < minCol + 3; k++) {
            var i = possible.indexOf(sudoku[j][k]);
            if (i != -1) {
                possible.splice(i, 1);
            }
        }
    }
    return possible;
}
