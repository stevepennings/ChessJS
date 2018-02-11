var oldPosition;
var newPosition;
var potentialPosition = [];
var piece;
var pieceDetails;
var player = 'player1';
var playerVerified;
var moves = 0;

function getPosition(event) {
	if (event.target.parentElement) {
		oldPosition = parseInt(event.target.parentElement.id);
		piece = event.target.id.substring(8, event.target.id.length);
		pieceDetails = event.target.id;
		window.identifyPlayer(player, pieceDetails);
		if (playerVerified) {
			window.identifyPiece(piece);
		}
	} else {
		console.log(event.target.id);
	}
}

function identifyPlayer(player) {
	if (player === pieceDetails.substring(0, 7)) {
		return playerVerified = true;
	} else {
		return playerVerified = false;
	}
}

function identifyPiece(piece) {
	if (potentialPosition.length !== 0) {
		clearFocus(potentialPosition);
	}
	switch (piece) {
		case 'pawn1': case 'pawn2': case 'pawn3': case 'pawn4': case 'pawn5': case 'pawn6': case 'pawn7': case 'pawn8':
			pawnOptions(oldPosition);
			break;
		case 'tower_1': case 'tower_2':
			towerOptions(oldPosition);
			break;
		case 'horse_1': case 'horse_2':
			horseOptions(oldPosition);
			break;
		case 'bishop_1': case 'bishop_2':
			bishopOptions(oldPosition);
			break;
		case 'king':
			console.log('Identify: ' + piece);
			break;
		case 'queen':
			bishopOptions(oldPosition);
			towerOptions(oldPosition);
			break;
		default:
			console.log('No piece to identify.');
	}
}


function pawnOptions(oldPosition) {
	switch (window.player) {
		case 'player1':
			for (var i = (oldPosition + 8); i <= (oldPosition + 16); i += 8) {
				potentialPosition.push(i);
			}
			break;
		case 'player2':
			for (var i = (oldPosition - 8); i >= (oldPosition - 16); i -= 8) {
				potentialPosition.push(i);
			}
			break;
		default:
			console.log('Getting options didnt work.');
	}
	focus(potentialPosition);
}

function towerOptions(oldPosition) {
	var row = document.getElementById(oldPosition).parentElement.id;
	var firstChild = parseInt(document.getElementById(row).firstChild.id);
	var item;
	for (var b = (oldPosition+8); b <= 64; b += 8) {
		potentialPosition.push(b);
	}
	for (var t = (oldPosition-8); t > 0; t -= 8) {
		potentialPosition.push(t);
	}
	for (var h = 0; h < 8; h++) {
		item = (firstChild + h);
		if (item != oldPosition) {
			potentialPosition.push(item);
		}
	}
	focus(potentialPosition);
}

function horseOptions(oldPosition) {
	// var modulo = (8 - (oldPosition % 8));
	// if (oldPosition <= 8) {
	// 	console.log('4 positions available')
	// 	if (modulo <= 1 || modulo >= 8) {
	// 		console.log('4 positions available');
	// 	} else if (modulo <= 2 || modulo >= 7) {
	// 		console.log('6 positions available');
	// 	}
	// }
	// for (var p = 0; p < 8; p++) {
	// 	switch (p) {
	// 		case 1:
	// 		if (oldPosition === )
	// 		break;
	// 		case 2:

	// 		break;
	// 		case 3:

	// 		break;
	// 		case 4:

	// 		break;
	// 		case 5:

	// 		break;
	// 		case 6:

	// 		break;
	// 		case 7:

	// 		break;
	// 		case 8:

	// 		break;
	// 	}
	// }
}

function bishopOptions(oldPosition) {
	var bottoml = oldPosition;
	var bottomr = oldPosition;
	var topl = oldPosition;
	var topr = oldPosition;
	var x;
	var y;
	var rightSide = (8 - (oldPosition % 8));
	if (rightSide === 8) {
		rightSide = 0;
	}
	var leftSide = (7 - rightSide);
	var topSide = Math.floor((oldPosition / 8));
	if (oldPosition == 8 || oldPosition == 16 || oldPosition == 24 || oldPosition == 32 || oldPosition == 40 || oldPosition == 48 || oldPosition == 56 || oldPosition == 64) {
		topSide = (topSide - 1);
		console.log('hey' + oldPosition);
	} 
	var botSide = (7 - topSide);
	console.log('rightside: ' + rightSide + ' leftside: ' + leftSide + ' topside: ' + topSide + ' botside: ' + botSide);

	if (rightSide < botSide) {
		for (var p = 0; p < rightSide; p++) {
			bottomr = (bottomr + 9);
			potentialPosition.push(bottomr);
		}
	} else if (botSide > rightSide) {
		for (var p = 0; p < botSide; p++) {
			bottomr = (bottomr + 9);
			potentialPosition.push(bottomr);
		}
	} else {
		for (var p = 0; p < botSide; p++) {
			bottomr = (bottomr + 9);
			potentialPosition.push(bottomr);
		}
	}

	if (leftSide < botSide) {
		for (var p = 0; p < leftSide; p++) {
			bottoml = (bottoml + 7);
			potentialPosition.push(bottoml);
		}
	} else if (botSide > leftSide) {
		for (var p = 0; p < botSide; p++) {
			bottoml = (bottoml + 7);
			potentialPosition.push(bottoml);
		}
	} else {
		for (var p = 0; p < botSide; p++) {
			bottoml = (bottoml + 7);
			potentialPosition.push(bottoml);
		}
	}

	if (leftSide < topSide) {
		for (var p = 0; p < leftSide; p++) {
			topl = (topl - 9);
			console.log(leftSide);
			potentialPosition.push(topl);
		}
	} else if (topSide > leftSide) {
		for (var p = 0; p < topSide; p++) {
			topl = (topl - 9);
			console.log(topSide);
			potentialPosition.push(topl);
		}
	} else {
		for (var p = 0; p < topSide; p++) {
			topl = (topl - 9);
			console.log(topl);
			potentialPosition.push(topl);
		}
	}

	if (rightSide < topSide) {
		for (var p = 0; p < rightSide; p++) {
			topr = (topr - 7);
			potentialPosition.push(topr);
		}
	} else if (topSide > rightSide) {
		for (var p = 0; p < topSide; p++) {
			topr = (topr - 7);
			potentialPosition.push(topr);
		}
	} else {
		for (var p = 0; p < topSide; p++) {
			topr = (topr - 7);
			potentialPosition.push(topr);
		}
	}
	
	
	focus(potentialPosition);	
}

function focus(potentialPosition) {
	for (var i = 0; i < potentialPosition.length; i++) {
		var o = document.getElementById(potentialPosition[i]);
		var overlay = document.createElement("div");
		overlay.setAttribute("id", 'pot' + potentialPosition[i]);
		overlay.setAttribute("onclick", "setPosition(event)");
		overlay.setAttribute("style", "position: absolute; top: 0; left: 0; height: 100%; width: 100%; background-color: #cbba83; opacity: 0.5;");
		o.appendChild(overlay);
	}
}

function setPosition(event) {
	window.newPosition = event.target.parentElement.id;
	var piece = window.player + '_' + window.piece;
	document.getElementById(window.newPosition).appendChild(
		document.getElementById(piece)
	);
	window.player = togglePlayer(player);
	clearFocus(potentialPosition);
}

function togglePlayer(player) {
	if (player === 'player1') {
		return 'player2';
	} else {
		return 'player1';
	}
}

function clearFocus(potentialPosition) {
	for (var i = 0; i < potentialPosition.length; i++) {
		var elem = document.getElementById('pot' + potentialPosition[i]);
		elem.remove();
	}
	potentialPosition.splice(0, potentialPosition.length);
	var playerTurn = document.getElementById("playerTurn");
	var movesDiv = document.getElementById("moves");
	if (player === 'player1') {
		playerTurn.textContent = 'Player 1';
		window.moves++;
		movesDiv.textContent = moves;
	} else if (player === 'player2') {
		playerTurn.textContent = 'Player 2';
	}
}