function isSquareAvailable(x, y) {
    let targetSquare_x = Math.floor(x / app.screen.width * 8)
    let targetSquare_y = Math.floor(y / app.screen.height * 8)
    
    const selectedPieceColor = turn % 2 == 0 ? "white" : "black";
    const targetedPieceColor = turn % 2 == 0 ? "black" : "white";
    
    if ((selectedPieceColor == "white" && turn % 2 != 0) || (selectedPieceColor == "black" && turn % 2 != 1)) return false // tried to move an enemy piece
    
    if (players[turn % 2] !== currentPlayer) return false // tried to move but it's not your turn

    if (currentPos[targetSquare_y][targetSquare_x] == "/") { // end location is a free square
        return true
    }

    if (selectedPieceColor != targetedPieceColor) { // end location is occupied by an enemy piece
        return true
    } else {
        return false
    }

}
