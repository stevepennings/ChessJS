var oldPosition;
var newPosition;
var potentialPosition = [];
var beatPosition = [];
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
		// nothing
	}
}

function identifyPlayer(player) {
	if (player === pieceDetails.substring(0, 7)) {
		return playerVerified = true;
	} else {
		return playerVerified = false;
	}
}

function getSurroundings(oldPosition, rightSide, leftSide, topSide, botSide) {
	rightSide = (8 - (oldPosition % 8));
	if (rightSide === 8) {
		rightSide = 0;
	}
	leftSide = (7 - rightSide);
	topSide = Math.floor((oldPosition / 8));
	if (oldPosition == 8 || oldPosition == 16 || oldPosition == 24 || oldPosition == 32 || oldPosition == 40 || oldPosition == 48 || oldPosition == 56 || oldPosition == 64) {
		topSide = (topSide - 1);
	}
	botSide = (7 - topSide);
	return [rightSide, leftSide, topSide, botSide];
}

function identifyPiece(piece) {
	var surroundings = getSurroundings(oldPosition, topSide, rightSide, botSide, leftSide);
	var rightSide = surroundings[0];
	var leftSide = surroundings[1];
	var topSide = surroundings[2];
	var botSide = surroundings[3];
	console.log('right: ' + rightSide + ' left: ' + leftSide + ' top: ' + topSide + ' bot: ' + botSide)
	if (potentialPosition.length !== 0) {
		clearFocus(potentialPosition, beatPosition);
	}
	switch (piece) {
		case 'pawn1': case 'pawn2': case 'pawn3': case 'pawn4': case 'pawn5': case 'pawn6': case 'pawn7': case 'pawn8':
			pawnOptions(oldPosition, player);
			focus(potentialPosition, beatPosition);
			break;
		case 'tower_1': case 'tower_2':
			towerOptions(oldPosition, topSide, rightSide, botSide, leftSide);
			focus(potentialPosition, beatPosition);
			break;
		case 'horse_1': case 'horse_2':
			horseOptions(oldPosition);
			focus(potentialPosition);
			break;
		case 'bishop_1': case 'bishop_2':
			bishopOptions(oldPosition, topSide, rightSide, botSide, leftSide);
			focus(potentialPosition, beatPosition);
			break;
		case 'king':
			kingOptions(oldPosition, topSide, rightSide, botSide, leftSide);
			focus(potentialPosition);
			break;
		case 'queen':
			bishopOptions(oldPosition, topSide, rightSide, botSide, leftSide, beatPosition);
			towerOptions(oldPosition, topSide, rightSide, botSide, leftSide);
			focus(potentialPosition, beatPosition);
			break;
		default:
			console.log('No piece to identify.');
	}
}

function pawnOptions(oldPosition, player) {
	switch (player) {
		case 'player1':
			for (var a = (oldPosition + 7); a <= (oldPosition + 9); a += 2) {
				if (document.getElementById(a).firstChild) {
					if (document.getElementById(a).firstChild.id.substring(0, 7) !== player) {
						beatPosition.push(a);
					}
				}
			}
			if (oldPosition >= 9 && oldPosition <= 16) {
				for (var i = (oldPosition + 8); i <= (oldPosition + 16); i += 8) {
					if (document.getElementById(i).firstChild) {
						if (document.getElementById(i).firstChild.id.substring(0, 7) === player) {
							i = (oldPosition + 16);
						} else {
							i = (oldPosition + 16);
						}
					} else {
						potentialPosition.push(i);
					}
				}
			} else if (!document.getElementById((oldPosition+8)).firstChild) {
				potentialPosition.push(oldPosition + 8);
			}
			break;
		case 'player2':
			for (var a = (oldPosition - 7); a >= (oldPosition - 9); a -= 2) {
				if (document.getElementById(a).firstChild) {
					if (document.getElementById(a).firstChild.id.substring(0, 7) !== player) {
						beatPosition.push(a);
					}
				}
			}
			if (oldPosition >= 49 && oldPosition <= 56) {
				for (var i = (oldPosition - 8); i >= (oldPosition - 16); i -= 8) {
					if (document.getElementById(i).firstChild) {
						if (document.getElementById(i).firstChild.id.substring(0, 7) === player) {
							i = (oldPosition - 16);
						} else {
							i = (oldPosition - 16);
						}
					} else {
						potentialPosition.push(i);
					}
				}
			} else if (!document.getElementById((oldPosition-8)).firstChild) {
				potentialPosition.push(oldPosition - 8);
			}
			break;
		default:
			console.log('Getting options didnt work.');
	}
}

function towerOptions(oldPosition, topSide, rightSide, botSide, leftSide, player) {
	var row = document.getElementById(oldPosition).parentElement.id;
	var firstChild = parseInt(document.getElementById(row).firstChild.id);
	var item;
	for (var b = (oldPosition + 8); b <= 64; b += 8) {
		if (document.getElementById(b).firstChild) {
			if (document.getElementById(b).firstChild.id.substring(0, 7) === window.player) {
				b = 64;
			} else {
				beatPosition.push(b);
				b = 64;
			}
		} else {
			potentialPosition.push(b);
		}
	}
	for (var t = (oldPosition - 8); t > 0; t -= 8) {
		if (document.getElementById(t).firstChild) {
			if (document.getElementById(t).firstChild.id.substring(0, 7) === window.player) {
				t = 0;
			} else {
				beatPosition.push(t);
				t = 0;
			}
		} else {
			potentialPosition.push(t);
		}
	}
	if (rightSide) {
		for (var hr = (oldPosition + 1); hr <= (oldPosition + rightSide); hr++) {
			if (document.getElementById(hr).firstChild) {
				if (document.getElementById(hr).firstChild.id.substring(0, 7) === window.player) {
					hr = (oldPosition + rightSide);
				} else {
					beatPosition.push(hr);
					hr = (oldPosition + rightSide);
				}
			} else {
				potentialPosition.push(hr);
			}

		}
	}
	if (leftSide) {
		for (var hl = (oldPosition - 1); hl >= (oldPosition - leftSide); hl--) {
			if (document.getElementById(hl).firstChild) {
				if (document.getElementById(hl).firstChild.id.substring(0, 7) === window.player) {
					hl = (oldPosition - leftSide);
				} else {
					beatPosition.push(hl);
					hl = (oldPosition - leftSide);
				}
			} else {
				potentialPosition.push(hl);
			}
		}
	}
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

function bishopOptions(oldPosition, topSide, rightSide, botSide, leftSide) {
	var bottoml = oldPosition;
	var bottomr = oldPosition;
	var topl = oldPosition;
	var topr = oldPosition;
	if (rightSide < botSide) {
		for (var p = 0; p < rightSide; p++) {
			bottomr = (bottomr + 9);
			if (document.getElementById(bottomr).firstChild) {
				if (document.getElementById(bottomr).firstChild.id.substring(0, 7) === window.player) {
					p = rightSide;
				} else {
					beatPosition.push(bottomr);
					p = rightSide;
				}
			} else {
				potentialPosition.push(bottomr);
			}
		}
	} else if (botSide > rightSide) {
		for (var p = 0; p < botSide; p++) {
			bottomr = (bottomr + 9);
			if (document.getElementById(bottomr).firstChild) {
				if (document.getElementById(bottomr).firstChild.id.substring(0, 7) === window.player) {
					p = botSide;
				} else {
					beatPosition.push(bottomr);
					p = botSide;
				}
			} else {
				potentialPosition.push(bottomr);
			}
		}
	} else {
		for (var p = 0; p < botSide; p++) {
			bottomr = (bottomr + 9);
			if (document.getElementById(bottomr).firstChild) {
				if (document.getElementById(bottomr).firstChild.id.substring(0, 7) === window.player) {
					p = botSide;
				} else {
					beatPosition.push(bottomr);
					p = botSide;
				}
			} else {
				potentialPosition.push(bottomr);
			}
		}
	}

	if (leftSide < botSide) {
		for (var p = 0; p < leftSide; p++) {
			bottoml = (bottoml + 7);
			if (document.getElementById(bottoml).firstChild) {
				if (document.getElementById(bottoml).firstChild.id.substring(0, 7) === window.player) {
					p = leftSide;
				} else {
					beatPosition.push(bottoml);
					p = leftSide;
				}
			} else {
				potentialPosition.push(bottoml);
			}
		}
	} else if (botSide > leftSide) {
		for (var p = 0; p < botSide; p++) {
			bottoml = (bottoml + 7);
			if (document.getElementById(bottoml).firstChild) {
				if (document.getElementById(bottoml).firstChild.id.substring(0, 7) === window.player) {
					p = botSide;
				} else {
					beatPosition.push(bottoml);
					p = botSide;
				}
			} else {
				potentialPosition.push(bottoml);
			}
		}
	} else {
		for (var p = 0; p < botSide; p++) {
			bottoml = (bottoml + 7);
			if (document.getElementById(bottoml).firstChild) {
				if (document.getElementById(bottoml).firstChild.id.substring(0, 7) === window.player) {
					p = botSide;
				} else {
					beatPosition.push(bottoml);
					p = botSide;
				}
			} else {
				potentialPosition.push(bottoml);
			}
		}
	}

	if (leftSide < topSide) {
		for (var p = 0; p < leftSide; p++) {
			topl = (topl - 9);
			if (document.getElementById(topl).firstChild) {
				if (document.getElementById(topl).firstChild.id.substring(0, 7) === window.player) {
					p = leftSide;
				} else {
					beatPosition.push(topl);
					p = leftSide;
				}
			} else {
				potentialPosition.push(topl);
			}
		}
	} else if (topSide > leftSide) {
		for (var p = 0; p < topSide; p++) {
			topl = (topl - 9);
			if (document.getElementById(topl).firstChild) {
				if (document.getElementById(topl).firstChild.id.substring(0, 7) === window.player) {
					p = topSide;
				} else {
					beatPosition.push(topl);
					p = topSide;
				}
			} else {
				potentialPosition.push(topl);
			}
		}
	} else {
		for (var p = 0; p < topSide; p++) {
			topl = (topl - 9);
			if (document.getElementById(topl).firstChild) {
				if (document.getElementById(topl).firstChild.id.substring(0, 7) === window.player) {
					p = topSide;
				} else {
					beatPosition.push(topl);
					p = topSide;
				}
			} else {
				potentialPosition.push(topl);
			}
		}
	}

	if (rightSide < topSide) {
		for (var p = 0; p < rightSide; p++) {
			topr = (topr - 7);
			if (document.getElementById(topr).firstChild) {
				if (document.getElementById(topr).firstChild.id.substring(0, 7) === window.player) {
					p = rightSide;
				} else {
					beatPosition.push(topr);
					p = rightSide;
				}
			} else {
				potentialPosition.push(topr);
			}
		}
	} else if (topSide > rightSide) {
		for (var p = 0; p < topSide; p++) {
			topr = (topr - 7);
			if (document.getElementById(topr).firstChild) {
				if (document.getElementById(topr).firstChild.id.substring(0, 7) === window.player) {
					p = topSide;
				} else {
					beatPosition.push(topr);
					p = topSide;
				}
			} else {
				potentialPosition.push(topr);
			}
		}
	} else {
		for (var p = 0; p < topSide; p++) {
			topr = (topr - 7);
			if (document.getElementById(topr).firstChild) {
				if (document.getElementById(topr).firstChild.id.substring(0, 7) === window.player) {
					p = topSide;
				} else {
					beatPosition.push(topr);
					p = topSide;
				}
			} else {
				potentialPosition.push(topr);
			}
		}
	}
}

function kingOptions(oldPosition, topSide, rightSide, botSide, leftSide) {
	var left = (leftSide != 0);
	var right = (rightSide != 0);
	var top = (topSide != 0);
	var bot = (botSide != 0);
	var steps = 1;
	for (var p = (oldPosition - 9); p <= (oldPosition + 9); p += steps) {
		potentialPosition.push(p);
		if (p == (oldPosition - 7)) {
			p = (oldPosition - 1)
			potentialPosition.push(p);
			steps = 2;
		} else if (p == (oldPosition + 1)) {
			steps = 1;
			p = (oldPosition + 7)
			potentialPosition.push(p);
		}
	}
	if (!top) {
		for (var p = (oldPosition - 9); p <= (oldPosition - 7); p++) {
			var i = potentialPosition.indexOf(p);
			potentialPosition.splice(i, 1);
		}
	}
	if (!bot) {
		for (var p = (oldPosition + 7); p <= (oldPosition + 9); p++) {
			var i = potentialPosition.indexOf(p);
			potentialPosition.splice(i, 1);
		}
	}
	if (!left) {
		for (var p = (oldPosition - 9); p <= (oldPosition + 7); p += 8) {
			var i = potentialPosition.indexOf(p);
			potentialPosition.splice(i, 1);
		}
	}
	if (!right) {
		for (var p = (oldPosition - 7); p <= (oldPosition + 9); p += 8) {
			var i = potentialPosition.indexOf(p);
			potentialPosition.splice(i, 1);
		}
	}
}

function focus(potentialPosition, beatPosition) {
	if (potentialPosition) {
		for (var i = 0; i < potentialPosition.length; i++) {
			var o = document.getElementById(potentialPosition[i]);
			var overlay = document.createElement("div");
			overlay.setAttribute("id", 'pot' + potentialPosition[i]);
			overlay.setAttribute("onclick", "setPosition(event)");
			overlay.setAttribute("style", "position: absolute; top: 0; left: 0; height: 100%; width: 100%; background-color: #cbba83; opacity: 0.5;");
			o.appendChild(overlay);
		}
	}
	if (beatPosition) {
		for (var b = 0; b < beatPosition.length; b++) {
			var oBeat = document.getElementById(beatPosition[b]);
			var overlayBeat = document.createElement("div");
			overlayBeat.setAttribute("id", 'pot' + beatPosition[b]);
			overlayBeat.setAttribute("onclick", "setPosition(event)");
			overlayBeat.setAttribute("style", "position: absolute; top: 0; left: 0; height: 100%; width: 100%; background-color: red; opacity: 0.5;");
			oBeat.appendChild(overlayBeat);
		}
	}
}

function setPosition(event) {
	var positionDetails = event.target.parentElement;
	window.newPosition = positionDetails.id;
	if (positionDetails.firstChild.id.substring(0, 6) == 'player') {
		var removePiece = document.getElementById(positionDetails.firstChild.id);
		if (removePiece.id.substring(8, 12) === 'king') {
			console.log('game over');
		}
		removePiece.remove();
	}
	var piece = window.player + '_' + window.piece;
	document.getElementById(window.newPosition).appendChild(
		document.getElementById(piece)
	);
	window.player = togglePlayer(player);
	getMoves();
	clearFocus(potentialPosition, beatPosition);
}

function getMoves() {
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

function togglePlayer(player) {
	if (player === 'player1') {
		return 'player2';
	} else {
		return 'player1';
	}
}

function clearFocus(potentialPosition, beatPosition) {
	if (potentialPosition) {
		for (var i = 0; i < potentialPosition.length; i++) {
			var elem = document.getElementById('pot' + potentialPosition[i]);
			elem.remove();
		}
		potentialPosition.splice(0, potentialPosition.length);
	}
	if (beatPosition) {
		for (var b = 0; b < beatPosition.length; b++) {
			var elemBeat = document.getElementById('pot' + beatPosition[b]);
			elemBeat.remove();
		}
		beatPosition.splice(0, beatPosition.length);
	}
}