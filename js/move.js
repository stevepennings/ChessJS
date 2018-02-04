var oldPosition;
var newPosition;
var potentialPosition = [];
var piece;
var player = 'player1';

function getPosition(event) {
	if(event.target.parentElement.id) {
		oldPosition = parseInt(event.target.parentElement.id);
		piece = event.target.id.substring(8, event.target.id.length);
		window.identifyPiece(piece);
	} else {
		console.log(event.target.id);
	}
}

function identifyPiece(piece) {
	if (potentialPosition.length !== 0) {
		window.clearFocus(potentialPosition);
	}
	switch(piece) {
		case 'pawn1':case 'pawn2':case 'pawn3':case 'pawn4':case 'pawn5':case 'pawn6':case 'pawn7':case 'pawn8':
		window.pawnOptions(oldPosition);
		break;
		case 'tower_1': case 'tower_2':
		console.log('Identify: ' + piece);
		break;
		case 'horse_1': case 'horse_2':
		console.log('Identify: ' + piece);
		break;
		case 'bishop_1': case 'bishop_2':
		console.log('Identify: ' + piece);
		break;
		case 'king':
		console.log('Identify: ' + piece);
		break;
		case 'queen':
		console.log('Identify: ' + piece);
		break;
		default:
		console.log('No piece to identify.');
	}
}


function pawnOptions(oldPosition) {
	switch (window.player) {
		case 'player1':
		for(var i = (oldPosition+8); i <= (oldPosition+16); i += 8) {
			potentialPosition.push(i);
		}
		break;
		case 'player2':
		for(var i = (oldPosition-8); i >= (oldPosition-16); i -= 8) {
			potentialPosition.push(i);
		}
		break;
		default:
		console.log('Getting options didnt work.');
	}
	window.focus(potentialPosition);
}

function focus(potentialPosition) {
	for (var i = 0; i < potentialPosition.length; i++) {
		var o = document.getElementById(potentialPosition[i]);
		var overlay = document.createElement("div");
		overlay.setAttribute("id", 'pot' + potentialPosition[i]);
		overlay.setAttribute("style", "height: 100%; width: 100%; background-color: #cbba83; opacity: 0.5;");
		o.appendChild(overlay);
	}
}

function clearFocus(potentialPosition) {
	for (var i = 0; i < potentialPosition.length; i++) {
		var elem = document.getElementById('pot' + potentialPosition[i]);
		elem.remove();
	}
	potentialPosition.splice(0, potentialPosition.length);
}

// var position1 = document.getElementById(pos1);
// 	var position2 = document.getElementById(pos2);
// 	position1.setAttribute("style", "background-color: #000; opacity: 0.5;");
// 	position2.setAttribute("style", "background-color: #000; opacity: 0.5;");