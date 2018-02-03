function move(event) {
	var oldPosition;
	var newPosition;
    var chessPieceId = event.target.id;
    var positionUnavailable = chessPieceId.substring(0, 6);
    var player = chessPieceId.substring(0, 7);
    var chessPiece = chessPieceId.substring(8, chessPieceId.length);
    if (positionUnavailable === 'player') {
    	console.log(chessPiece + ' of ' + player);
    } else {
    	console.log(event.target.id);
    }

    // switch(target) {
    // 	case 'tower_1';
    // }
}