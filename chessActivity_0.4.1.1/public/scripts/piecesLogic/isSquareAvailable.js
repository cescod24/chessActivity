function isSquareAvailable(initialSquare, x, y) {
    let targetSquare_x = Math.floor(x / app.screen.width * 8)
    let targetSquare_y = Math.floor(y / app.screen.height * 8)
    
    const selectedPieceColor = ("RNBKPQ".includes(currentPos[initialSquare[1]][initialSquare[0]])) ? "white" : "black";
    const targetedPieceColor = ("RNBKPQ".includes(currentPos[targetSquare_y][targetSquare_x])) ? "white" : "black";

    if ((selectedPieceColor == "white" && turn % 2 != 0) || (selectedPieceColor == "black" && turn % 2 != 1)) return false

    if (currentPos[targetSquare_y][targetSquare_x] == "/") {
        return true
    }

    if (selectedPieceColor != targetedPieceColor) {
        return true
    } else {
        return false
    }

}
