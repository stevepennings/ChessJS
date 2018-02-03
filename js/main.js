var positionId = 0;


function createBoard() {
    createPositionsGrid();
    createHorizontalIndex();
    createVerticalIndex();
}

function createPositionsGrid() {
    // Board reference
    var positions = document.getElementById("positions");
    var colorSwitch = 1;
    // Nested loop
    for (var row = 0; row < 8; row++) {
        var vPositions = document.createElement("tr");
        for(var column = 0; column < 8; column++) {
            var position = document.createElement("td");
            position.style.backgroundColor = "white";
            position.positionId = positionId++;

            // Give each tablecell an id as reference
            position.setAttribute("id", positionId);
            position.setAttribute("onclick", "move(event)");

            // Change background color on odd numbers to create a chess table
            if (position.positionId % 8 == 0) {
                if (colorSwitch === 1) {
                    colorSwitch = 0;
                } else {
                    colorSwitch = 1;
                }
            }

            if(position.positionId % 2 == colorSwitch) {
                position.style.backgroundColor = "#f5f5f5";
            } else {
                position.style.backgroundColor = "#c2c2c2";
            }

            vPositions.appendChild(position);
            // Print position id's for testing
            // position.innerHTML = positionId;
        }
        positions.appendChild(vPositions);
    }   
}

function createHorizontalIndex() {
    var horizontalPositions = document.getElementById("horizontalPositions");
    var hContent = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    // The letters from A-H of a chessboard
    for (var column = 0; column < hContent.length; column++) {
        var hIndex = document.createElement("td");
        // Print position id's for testing
        hIndex.innerHTML = hContent[column];
        horizontalPositions.appendChild(hIndex);
    }   
}

function createVerticalIndex() {
    var verticalPositions = document.getElementById("verticalPositions");
    // The letters from A-H of a chessboard
    for (var column = 1; column < 9; column++) {
        var vIndex = document.createElement("tr");
        // Print position id's for testing
        vIndex.innerHTML = column;
        verticalPositions.appendChild(vIndex);
    }  
}

function resetGame() {
    console.log('Restart chess game');
}