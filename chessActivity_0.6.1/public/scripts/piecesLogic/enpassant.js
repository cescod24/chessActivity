let isEnpassantPossibleData = [false, [undefined, undefined]]

function isEnpassantPossible (targetSquare_x, targetSquare_y, initial_x, initial_y) {
    if (!isEnpassantPossibleData[0]) return false

    if (targetSquare_x == isEnpassantPossibleData[1][0] && ((targetSquare_y == 2 && isEnpassantPossibleData[1][1] == 3 && turn % 2 == 0 && initial_y == 3) || (targetSquare_y == 5 && isEnpassantPossibleData[1][1] == 4 && turn % 2 == 1 && initial_y == 4)) && (initial_x == isEnpassantPossibleData[1][0] + 1 || initial_x == isEnpassantPossibleData[1][0] - 1)) {
        justEnpassanted = true
		isEnpassantPossibleData = [false, [undefined, undefined]]
        return true
    }

    return false
}