function canCastle (initial_x, initial_y, final_x, final_y, selectedPieceType) {

    let color = selectedPieceType === "K" ? 0 : 1 // 0 means white and 1 means black

    // king side
    if (final_x == initial_x + 2 && whereIsCastleAvailable[color][1] && currentPos[initial_y][final_x - 1] == "/" && currentPos[initial_y][final_x] == "/") {
        moveRook(final_x, final_y)
        return true
    }

    // queen side
    if (final_x == initial_x - 2 && whereIsCastleAvailable[color][0] && currentPos[initial_y][final_x - 1] == "/" && currentPos[initial_y][final_x] == "/" && currentPos[initial_y][final_x + 1] == "/") {
        moveRook(final_x, final_y)
        return true
    }

    return false

}

function moveRook (final_x, final_y) {

    let color = undefined
    let side = undefined
    let rookPos = undefined

    final_y === 7 ? color = 1 : color = 0 // 0 means black, 1 means white

    final_x === 6 ? side = 1 : side = 0 // 1 means king side and 0 means queen side

    switch (color * 2 + side) {
        case 0:
            rookPos = 0
            break;
        case 1:
            rookPos = 7
            break;
        case 2:
            rookPos = 56
            break;
        case 3:
            rookPos = 63
            break;
    }
    
    const rooksFictionalMove = {
        initialRookSquare: [side === 1 ? 7 : 0, color === 0 ? 0 : 7],
        finalRook_x: side === 1 ? 5 : 3,
        finalRook_y: color === 0 ? 0 : 7,
    }

    piecesSprites[rookPos].x = app.screen.width / 8 / 2 + rooksFictionalMove.finalRook_x * app.screen.width / 8
    piecesSprites[rookPos].y = app.screen.height / 8 / 2 + rooksFictionalMove.finalRook_y * app.screen.height / 8

    logicManager(rooksFictionalMove.initialRookSquare, rooksFictionalMove.finalRook_x, rooksFictionalMove.finalRook_y, "castling")

    turn--

}