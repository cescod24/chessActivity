let currentPos = [[],[],[],[],[],[],[],[],]
let currentToIndex = [[],[],[],[],[],[],[],[],]
let justEnpassanted = false
let justPlayedCastleSound = false

let turn = 0 // 0 means white's turn

let whereIsCastleAvailable = [
    [false, false], // white left and right castle
    [false, false], // black left and right castle
]

function logicManager(initialSquare, x, y, extraParameter) {
    
    let targetSquare_x = Math.floor(x / app.screen.width * 8)
    let targetSquare_y = Math.floor(y / app.screen.height * 8)

    if (extraParameter === "castling") {
        targetSquare_x = x;
        targetSquare_y = y;
    }

    const selectedPieceColor = turn % 2 == 0 ? "white" : "black";
    const targetedPieceColor = turn % 2 == 0 ? "black" : "white";

    turn++ // increase the turn by 1


    // Logic if you move to an empty square 
    if ((currentPos[targetSquare_y][targetSquare_x] == "/" && !justEnpassanted)) {

        // these 3 lines update the current position array: a scheme of the current position
        let temp = currentPos[initialSquare[1]][initialSquare[0]]
        currentPos[initialSquare[1]][initialSquare[0]] = "/"
        currentPos[targetSquare_y][targetSquare_x] = temp

        // these 3 lines update the currentToIndex array: this array points to the original position of each piece 
        let temp2 = currentToIndex[initialSquare[1]][initialSquare[0]]
        currentToIndex[initialSquare[1]][initialSquare[0]] = currentToIndex[targetSquare_y][targetSquare_x]
        currentToIndex[targetSquare_y][targetSquare_x] = temp2

        if (extraParameter !== "castling" && !justPlayedCastleSound) {
            sounds[0].play()
        } else if (extraParameter === "castling") {
            sounds[4].play()
            justPlayedCastleSound = true
        }

    } else if ((selectedPieceColor != targetedPieceColor || justEnpassanted)) { // Logic if you take (go onto another color piece) or en passant

        currentPos[targetSquare_y][targetSquare_x] = currentPos[initialSquare[1]][initialSquare[0]]
        currentPos[initialSquare[1]][initialSquare[0]] = "/"
        
        // this if just shifts the perspective to eliminate the enpassanted pawn
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

    }
    // this to help the server and upload the new position
    if (extraParameter !== "castling") {
        justPlayedCastleSound = false
        let nextFEN = rebuildFEN()
        postNewFEN(nextFEN)
    }
            
}

