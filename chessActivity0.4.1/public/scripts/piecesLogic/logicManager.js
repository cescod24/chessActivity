let currentPos = [[],[],[],[],[],[],[],[],]
let currentToIndex = [[],[],[],[],[],[],[],[],]
let justEnpassanted = false

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

    lastMove = [selectedPieceType, [targetSquare_x, targetSquare_y]]

    const selectedPieceColor = ("RNBKPQ".includes(currentPos[initialSquare[1]][initialSquare[0]])) ? "white" : "black";
    const targetedPieceColor = ("RNBKPQ".includes(currentPos[targetSquare_y][targetSquare_x])) ? "white" : "black";

    turn++ // increase the turn by 1

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

    if (currentPos[targetSquare_y][targetSquare_x] == "/" && !justEnpassanted) {

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

    if (selectedPieceColor != targetedPieceColor || justEnpassanted) {

        currentPos[targetSquare_y][targetSquare_x] = currentPos[initialSquare[1]][initialSquare[0]]
        currentPos[initialSquare[1]][initialSquare[0]] = "/"
        
        // this if  just shifts the perspective to eliminate the enpassanted pawn
        if (justEnpassanted) {
            selectedPieceColor == "white" ? targetSquare_y++ : targetSquare_y--
            currentPos[targetSquare_y][targetSquare_x] = "/"
        }

        // these lines are capable of eliminating a piece upon its capture
        app.stage.removeChild(piecesSprites[currentToIndex[targetSquare_y][targetSquare_x]])
        piecesSprites[currentToIndex[targetSquare_y][targetSquare_x]] = undefined

        // this if  just shifts back the perspective to regulate the variables without the just applied shift
        if (justEnpassanted) {
            currentToIndex[targetSquare_y][targetSquare_x] = undefined
            selectedPieceColor == "white" ? targetSquare_y-- : targetSquare_y++
        }

        currentToIndex[targetSquare_y][targetSquare_x] = currentToIndex[initialSquare[1]][initialSquare[0]]
        currentToIndex[initialSquare[1]][initialSquare[0]] = undefined

        sounds[1].play()
        justEnpassanted = false;

        return
    }

}
