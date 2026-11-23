let grid, position_data_cell, compression_method_select, cells;
let compression_method = "none";
let position_string = "";
let position = [];
const character_optimization_map = ["r", "n", "b", "q", "k", "p", "R", "N", "B", "Q", "K", "P", "-", "-", "-", "-"];
// Combination for character optimization v1 for base position
// #Ed2wwwwïïïïïïïïïïïïïïïïÝÝÝÝ
const pieces = {
    "r": "../assets/rook-b.svg",
    "n": "../assets/knight-b.svg",
    "b": "../assets/bishop-b.svg",
    "q": "../assets/queen-b.svg",
    "k": "../assets/king-b.svg",
    "p": "../assets/pawn-b.svg",
    "R": "../assets/rook-w.svg",
    "N": "../assets/knight-w.svg",
    "B": "../assets/bishop-w.svg",
    "Q": "../assets/queen-w.svg",
    "K": "../assets/king-w.svg",
    "P": "../assets/pawn-w.svg"
};

function drawGrid() {
    cells.forEach((cell, index) => {
                const piece = position_string[index];
                const img = cell.querySelector(".cell_image");
                img.src = pieces[piece] || "../assets/empty.svg";
            });
}

function updateGridFromPosition(pos) {
    switch (compression_method) {
        case "none":
            position_string = pos.trim().replaceAll("/", "").replace(/\d/g, (digit) => '-'.repeat(Number(digit))).slice(0, 64).padEnd(64, "-");
            drawGrid();
            break;
        /*
            case "character optimization v1":
            //console.log(pos);
            //console.log(pos.charCodeAt(0).toString(2).padStart(8, "0"))
            pos = pos.padEnd(32, "ï");
            //console.log(pos);
            let piece_string = "";
            for (const char of pos) {
                piece_string += char.charCodeAt(0).toString(2).padStart(8, "0");
            }
            console.log(piece_string);
            position_string = ""
            for (let i = 0; i < 64; i++) {
                position_string += character_optimization_map[parseInt(piece_string.slice(4*i, 4*(i+1)), 2)-2];
            }
            drawGrid();
            break;
        */
        default:
            console.error("Unknown compression method:", compression_method);
            return;
    }

}

function numberToLetter(num) {
    if (num <= 26 && num >= 1) {
        return String.fromCharCode(96 + num);
    }
    return "";
}

function getCellId(index) {
    const col = index % 8;
    const row = (index - index % 8) / 8;
    return `${numberToLetter(col+1)}${8-row}`;
}

function showCellEditor(cell) {
}

window.onload = function() {
    grid = document.getElementById("grid");
    position_data_cell = document.getElementById("position_data");
    compression_method_select = document.getElementById("compression_method");
    cells = document.querySelectorAll(".cell");

    cells.forEach((cell, index) => {

        cell.addEventListener("click", function() {
            showCellEditor(cell);
        });

        cell.appendChild(document.createElement("span")).classList.add("cell_id_label");
        cell.lastChild.textContent = cell.id;

        const img = document.createElement("img");
        img.src = "../assets/empty.svg";
        img.classList.add("cell_image");
        cell.appendChild(img);
       // TEST: console.log("Cell ID ", cell.id, "Computed ID ", getCellId(index), "Status: ", cell.id === getCellId(index));
    });

    position_data_cell.addEventListener("input", function() {
        const pos = this.value;
        updateGridFromPosition(pos);
    });

    compression_method_select.addEventListener("input", function() {
        compression_method = this.value;
        console.log("Selected compression method:", compression_method);
    });



};