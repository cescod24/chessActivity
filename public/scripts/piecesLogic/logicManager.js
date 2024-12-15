let currentPos = [[],[],[],[],[],[],[],[],]
let currentToIndex = [[],[],[],[],[],[],[],[],]

let turn = 0 // 0 means white's turn

let whereIsCastleAvailable = [
    [false, false], // white left and right castle
    [false, false], // black left and right castle
]

function logicManager(initialSquare, x, y, extra) {

    let targetSquare_x = Math.floor(x / app.screen.width * 8)
    let targetSquare_y = Math.floor(y / app.screen.height * 8)

    if (extra === "castling") {
        targetSquare_x = x;
        targetSquare_y = y;
    }

    const selectedPieceType = currentPos[initialSquare[1]][initialSquare[0]]

    const selectedPieceColor = ("RNBKPQ".includes(currentPos[initialSquare[1]][initialSquare[0]])) ? "white" : "black";
    const targetedPieceColor = ("RNBKPQ".includes(currentPos[targetSquare_y][targetSquare_x])) ? "white" : "black";

    turn += 1 // increase the turn by 1

    // this 2 ifs, change the whereIsCastleAvailable variable.
    if (selectedPieceType == "K" || selectedPieceType == "k") {
        selectedPieceColor == "white" ? whereIsCastleAvailable[0] = [false, false] : whereIsCastleAvailable[1] = [false, false]
    }
    if (selectedPieceType == "R" || selectedPieceType == "r") {
        if (currentToIndex[initialSquare[1]][initialSquare[0]] % 8 == 0) {
            selectedPieceColor == "white" ? whereIsCastleAvailable[0][0] = false : whereIsCastleAvailable[1][0] = false
        } else {
            selectedPieceColor == "white" ? whereIsCastleAvailable[0][1] = false : whereIsCastleAvailable[1][1] = false
        }
    }

    if (currentPos[targetSquare_y][targetSquare_x] == "/") {

        // these 3 lines update the current position array: a scheme of the current position
        let temp = currentPos[initialSquare[1]][initialSquare[0]]
        currentPos[initialSquare[1]][initialSquare[0]] = "/"
        currentPos[targetSquare_y][targetSquare_x] = temp

        // these 3 lines update the currentToIndex array: this array points to the original position of each piece 
        let temp2 = currentToIndex[initialSquare[1]][initialSquare[0]]
        currentToIndex[initialSquare[1]][initialSquare[0]] = currentToIndex[targetSquare_y][targetSquare_x]
        currentToIndex[targetSquare_y][targetSquare_x] = temp2

        sounds[0].play()

        return
    }

    if (selectedPieceColor != targetedPieceColor) {

        currentPos[targetSquare_y][targetSquare_x] = currentPos[initialSquare[1]][initialSquare[0]]
        currentPos[initialSquare[1]][initialSquare[0]] = "/"


        // these 3 lines are capable of eliminating a piece upon its capture
        spriteKiller[currentToIndex[targetSquare_y][targetSquare_x]] = true // update spriteKillers, an array that contains a value for each piece visibility.
        currentToIndex[targetSquare_y][targetSquare_x] = currentToIndex[initialSquare[1]][initialSquare[0]]
        currentToIndex[initialSquare[1]][initialSquare[0]] = undefined

        sounds[1].play()

        return
    }

}
