function canCastle (initial_x, initial_y, final_x, final_y, selectedPieceType) {

    let color = selectedPieceType === "K" ? 0 : 1 // 0 means white and 1 means black

    // king side
    if (final_x == initial_x + 2 && whereIsCastleAvailable[color][1] && currentPos[initial_y][final_x - 1] == "/" && currentPos[initial_y][final_x] == "/") {
        justCastled = true
        return true
    }

    // queen side
    if (final_x == initial_x - 2 && whereIsCastleAvailable[color][0] && currentPos[initial_y][final_x - 1] == "/" && currentPos[initial_y][final_x] == "/" && currentPos[initial_y][final_x + 1] == "/") {
        justCastled = true
        return true
    }

    return false

}

function moveRook (final_x, final_y) {

    turn--

    let color = undefined
    let side = undefined

    Math.floor(final_y / app.screen.height * 8) === 7 ? color = 1 : color = 0 // 0 means black, 1 means white

    Math.floor(final_x / app.screen.width * 8) === 6 ? side = 1 : side = 0 // 1 means king side and 0 means queen side
    
    const rooksFictionalMove = {
        initialRookSquare: [side === 1 ? 7 : 0, color === 0 ? 0 : 7],
        finalRook_x: side === 1 ? 5 : 3,
        finalRook_y: color === 0 ? 0 : 7,
    }

    rooksToCastle[color * 2 + side].x = app.screen.width / 8 / 2 + rooksFictionalMove.finalRook_x * app.screen.width / 8
    rooksToCastle[color * 2 + side].y = app.screen.height / 8 / 2 + rooksFictionalMove.finalRook_y * app.screen.height / 8

    logicManager(rooksFictionalMove.initialRookSquare, rooksFictionalMove.finalRook_x, rooksFictionalMove.finalRook_y, "castling")

}