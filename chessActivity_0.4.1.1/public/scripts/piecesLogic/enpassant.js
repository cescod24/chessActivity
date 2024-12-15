let lastMove = [undefined, [undefined, undefined]];

function isEnpassantPossible (targetSquare_x, targetSquare_y, initial_x, initial_y) {
    if (lastMove[0] !== "P" && lastMove[0] !== "p") return false

    if (targetSquare_x == lastMove[1][0] && ((targetSquare_y == 2 && lastMove[1][1] == 3 && turn % 2 == 0 && initial_y == 3) || (targetSquare_y == 5 && lastMove[1][1] == 4 && turn % 2 == 1 && initial_y == 4)) && (initial_x == lastMove[1][0] + 1 || initial_x == lastMove[1][0] - 1)) {
        justEnpassanted = true
        return true
    }

    return false
}