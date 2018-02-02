var positionId = 0;


function createBoard() {
    createPositionsGrid();
    createHorizontalIndex();
    createVerticalIndex();
}

function createPositionsGrid() {
    // Board reference
    var positions = document.getElementById("positions");
    // Nested loop
    for (var row = 0; row < 8; row++) {
        var vPositions = document.createElement("tr");
        for(var column = 0; column < 8; column++) {
            var position = document.createElement("td");
            position.style.backgroundColor = "white";
            position.positionId = positionId++;

            if(position.positionId % 2 == 0) {
                position.style.backgroundColor = "black";
            }

            vPositions.appendChild(position);
            // Print position id's for testing
            position.innerHTML = positionId;
        }
        positions.appendChild(vPositions);
    }   
}

function createHorizontalIndex() {
    // The letters from A-H of a chessboard
}

function createVerticalIndex() {
    // The numbers from 1-8 of a chessboard
}