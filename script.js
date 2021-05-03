const columns = Math.round(Math.round(window.innerWidth) / 10);
const rows = Math.round(Math.round(window.innerHeight) / 10);
let current = [rows];
let nextGen = [rows];
let speed = 500;
let gameStarted = false;
let interval;


createGameboard();
create2DArrays();
randomizeCells();

function createGameboard() {
    const grid = document.getElementById("gameboard");
    for (let y = 0; y < rows; y++) {
        let row = document.createElement("div");
        row.classList.add("row");
        grid.append(row);
        for (x = 0; x < columns; x++) {
            let cell = document.createElement("div");
            cell.setAttribute("id", y + "_" + x);
            cell.classList.add("cell");
            row.append(cell);
        }
    }
}

function create2DArrays() {
    for (let i = 0; i < rows; i++) {
        current[i] = new Array(columns);
        nextGen[i] = new Array(columns);
    }
}

function randomizeCells() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            nextGen[i][j] = 0;
            current[i][j] = 0;
            if (Math.random() < 0.4) current[i][j] = 1;
        }
    }
    let randomCell = "";
    for (row in current) {
        for (column in current[row]) {
            randomCell = document.getElementById(row + "_" + column);
            if (current[row][column] == 1) {
                randomCell.classList.add("alive");
            }
        }
    }
}

function nextGeneration() {
    for (row in current) {
        for (column in current[row]) {
            let neighbors = countNeighbors(row, column);
            if (current[row][column] == 1) {
                if (neighbors < 2) {
                    nextGen[row][column] = 0;
                } else if (neighbors == 2 || neighbors == 3) {
                    nextGen[row][column] = 1;
                } else if (neighbors > 3) {
                    nextGen[row][column] = 0;
                }
            } else if (current[row][column] == 0) {
                if (neighbors == 3) {
                    nextGen[row][column] = 1;
                }
            }
        }
    }
    updateCurrent();
    updateBoard();
}

function updateCurrent() {
    for (row in current) {
        for (column in current[row]) {
            current[row][column] = nextGen[row][column];
            nextGen[row][column] = 0;
        }
    }
}

function updateBoard() {
    let cell = "";
    for (row in current) {
        for (column in current[row]) {
            cell = document.getElementById(row + "_" + column);
            if (current[row][column] == 0) {
                cell.classList.remove("alive");
            } else {
                cell.classList.add("alive");
            }
        }
    }
}

function evolve() {
    console.log(current)
    setInterval(nextGeneration, speed);

}

function countNeighbors(row, col) {
    let count = 0;
    let numRow = Number(row);
    let numCol = Number(col);

    if (numRow - 1 >= 0) {
        if (current[numRow - 1][numCol] == 1)
            count++;
    }
    if (numRow - 1 >= 0 && numCol - 1 >= 0) {
        if (current[numRow - 1][numCol - 1] == 1)
            count++;
    }
    if (numRow - 1 >= 0 && numCol + 1 < columns - 1) {
        if (current[numRow - 1][numCol + 1] == 1)
            count++;
    }
    if (numCol - 1 >= 0) {
        if (current[numRow][numCol - 1] == 1)
            count++;
    }
    if (numCol + 1 < columns) {
        if (current[numRow][numCol + 1] == 1)
            count++;
    }
    if (numRow + 1 < rows && numCol - 1 >= 0) {
        if (current[numRow + 1][numCol - 1] == 1)
            count++;
    }
    if (numRow + 1 < rows && numCol + 1 < columns - 1) {
        if (current[numRow + 1][numCol + 1] == 1)
            count++;
    }
    if (numRow + 1 < rows) {
        if (current[numRow + 1][numCol] == 1)
            count++;
    }
    return count;
}