function basicMovement(initialSquare, x, y) {
    let targetSquare_x = Math.floor(x / app.screen.width * 8)
    let targetSquare_y = Math.floor(y / app.screen.height * 8)

    if (initialSquare[0] == targetSquare_x && initialSquare[1] == targetSquare_y) return false

    let selectedPieceType = currentPos[initialSquare[1]][initialSquare[0]]

    let newEnPassantData = false

    let isPermitted = false

    switch (selectedPieceType) {
        case "P" :
            if (initialSquare[0] == targetSquare_x && targetSquare_y + 2 == initialSquare[1] && initialSquare[1] == 6 && currentPos[targetSquare_y][targetSquare_x] == "/") isPermitted = true, isEnpassantPossibleData = [true, [targetSquare_x, turn % 2 == 0 ? 3 : 4]], newEnPassantData = true // move by two
            if (initialSquare[0] == targetSquare_x && targetSquare_y + 1 == initialSquare[1] && currentPos[targetSquare_y][targetSquare_x] == "/") isPermitted = true // move by one
            if ((initialSquare[0] == targetSquare_x + 1 || initialSquare[0] == targetSquare_x - 1) && targetSquare_y + 1 == initialSquare[1] && currentPos[targetSquare_y][targetSquare_x] != "/") isPermitted = true // capture
            if (isEnpassantPossible(targetSquare_x, targetSquare_y, initialSquare[0], initialSquare[1])) isPermitted = true // en passant
            break
        case "p" :
            if (initialSquare[0] == targetSquare_x && targetSquare_y - 2 == initialSquare[1] && initialSquare[1] == 1 && currentPos[targetSquare_y][targetSquare_x] == "/") isPermitted = true, isEnpassantPossibleData = [true, [targetSquare_x, turn % 2 == 0 ? 3 : 4]], newEnPassantData = true  // move by two
            if (initialSquare[0] == targetSquare_x && targetSquare_y - 1 == initialSquare[1] && currentPos[targetSquare_y][targetSquare_x] == "/") isPermitted = true // move by one
            if ((initialSquare[0] == targetSquare_x - 1 || initialSquare[0] == targetSquare_x + 1) && targetSquare_y - 1 == initialSquare[1] && currentPos[targetSquare_y][targetSquare_x] != "/") isPermitted = true // capture
            if (isEnpassantPossible(targetSquare_x, targetSquare_y, initialSquare[0], initialSquare[1])) isPermitted = true // en passant
            break
        case "q" :
        case "Q" :
            if (initialSquare[0] == targetSquare_x && initialSquare[1] != targetSquare_y && !rookHasJumpedOver(initialSquare[1], targetSquare_y, targetSquare_x, "vertical")) isPermitted = true // queen vertical
            if (initialSquare[1] == targetSquare_y && initialSquare[0] != targetSquare_x && !rookHasJumpedOver(initialSquare[0], targetSquare_x, targetSquare_y, "horizontal")) isPermitted = true // queen horizontal
            if (Math.abs(initialSquare[0] - targetSquare_x) == Math.abs(initialSquare[1] - targetSquare_y) && !bishopHasJumpedOver(initialSquare[0], initialSquare[1], targetSquare_x, targetSquare_y)) isPermitted = true //queen diagonal
            break
        case "r" :
        case "R" :
            if (initialSquare[0] == targetSquare_x && initialSquare[1] != targetSquare_y && !rookHasJumpedOver(initialSquare[1], targetSquare_y, targetSquare_x, "vertical")) isPermitted = true //rook vertical
            if (initialSquare[1] == targetSquare_y && initialSquare[0] != targetSquare_x && !rookHasJumpedOver(initialSquare[0], targetSquare_x, targetSquare_y, "horizontal")) isPermitted = true // rook horizontal
            break
        case "n" :
        case "N" : 
            if (Math.pow(initialSquare[0] - targetSquare_x, 2) + Math.pow(initialSquare[1] - targetSquare_y, 2) == 5) isPermitted = true // knight
            break
        case "b" :
        case "B" :
            if (Math.abs(initialSquare[0] - targetSquare_x) == Math.abs(initialSquare[1] - targetSquare_y) && !bishopHasJumpedOver(initialSquare[0], initialSquare[1], targetSquare_x, targetSquare_y)) isPermitted = true // bishop
            break
        case "k" :
        case "K" :
            if (Math.pow(initialSquare[0] - targetSquare_x, 2) + Math.pow(initialSquare[1] - targetSquare_y, 2) == 2 || Math.pow(initialSquare[0] - targetSquare_x, 2) + Math.pow(initialSquare[1] - targetSquare_y, 2) == 1) isPermitted = true // king
            if (targetSquare_x == initialSquare[0] + 2 || targetSquare_x == initialSquare[0] - 2) isPermitted = canCastle(initialSquare[0], initialSquare[1], targetSquare_x, targetSquare_y, selectedPieceType) // is castling 
            break
    }

    if (isPermitted) {
        if (!newEnPassantData) isEnpassantPossibleData = [false, [undefined, undefined]]
        newEnPassantData = false
        return true
    } else {
        return false
    }

}

// Checks if rooks doesn't jump over a piece
function rookHasJumpedOver (start, end, line, direction) {
    if (start > end) {
        let temp = start
        start = end
        end = temp
    }

    for (let i = start + 1; i < end && direction == "vertical"; i++) {
        if (currentPos[i][line] != "/") return true
    }
    for (let i = start + 1; i < end && direction == "horizontal"; i++) {
        if (currentPos[line][i] != "/") return true
    }

    return false
}

// Checks if bishop doesn't jump over a piece
function bishopHasJumpedOver (initial_x, initial_y, final_x, final_y) {

    let x_increment = (final_x - initial_x > 0) ? 1 : -1
    let y_increment = (final_y - initial_y > 0) ? 1 : -1

    for (let steps = 1; steps < Math.abs(final_x - initial_x); steps++) {
        if (currentPos[initial_y + steps * y_increment][initial_x + steps * x_increment] != "/") return true
    }

    return false
}
