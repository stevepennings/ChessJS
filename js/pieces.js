var player1 = ['tower_1', 'horse_1', 'bishop_1', 'king', 'queen', 'bishop_2', 'horse_2', 'tower_2', 'pawn1', 'pawn2', "pawn3", "pawn4", "pawn5", "pawn6", "pawn7", "pawn8"];
var player2 = ['pawn1', 'pawn2', 'pawn3', 'pawn4', 'pawn5', 'pawn6', 'pawn7', 'pawn8', 'tower_1', 'horse_1', 'bishop_1', "king", "queen", "bishop_2", "horse_2", "tower_2"];

function setPieces(chessPiece) {
    var totalPieces = player1.length;
    var player = 'player1';
    var i = 0;
    for (var p = 0; p < 2; p++) {
        if(p === 1) {
            i = 48;
            totalPieces = 64;
            player = 'player2';
        }
        for (i; i < totalPieces; i++) {
            var num = (i - 48);
            var pos = document.getElementById((i + 1));
            var chessPieceImg = document.createElement("img");
            chessPieceImg.setAttribute('style', 'position: absolute; top: 0px; left: 0px; width: 36px; height: 36px;');
            if(player !== 'player2'){
                chessPiece = player1[i];
            } else if(player !== 'player1'){
                chessPiece = player2[num];
            }

            // Chesspiece reference
            chessPieceImg.setAttribute("id", player + '_' + chessPiece);

            // Chesspiece styles
            switch(chessPiece){
                case 'tower_1': case 'tower_2': case 'horse_1': case 'horse_2': case 'bishop_1': case 'bishop_2':
                    chessPieceImg.setAttribute('src', 'img/' + player + '/' + chessPiece +'.svg');
                    chessPieceImg.setAttribute('style', 'width: 36px; height: 36px;');
                    break;
                case 'king': case 'queen':
                    chessPieceImg.setAttribute('src', 'img/' + player + '/' + chessPiece +'.svg');
                    chessPieceImg.setAttribute('style', 'width: 48px; height: 48px;');
                    break;
                case 'pawn1': case 'pawn2': case 'pawn3': case 'pawn4': case 'pawn5': case 'pawn6': case 'pawn7': case 'pawn8':
                    chessPieceImg.setAttribute('src', 'img/' + player + '/pawn.svg');
                    chessPieceImg.setAttribute('style', 'width: 32px; height: 32px;');
                    break;
                default:
                    console.log('No piece.');
            }
            // Append chesspiece to position.
            pos.appendChild(chessPieceImg);
        }
    }
}