let inCheck = false

function isInCheck(){

    if(turn % 2 === 0 && currentPos[whiteKingIndex[0]][whiteKingIndex[1]] === "K") {

        if(currentPos[whiteKingIndex[0] - 1][whiteKingIndex[1] - 1] === "p" || currentPos[whiteKingIndex[0] - 1][whiteKingIndex[1] + 1] === "p") inCheck = true //pawn check?
        
        let i = 0;
        let j = whiteKingIndex[1] - whiteKingIndex[0];
        while (j < 8) {

            if((currentPos[i][j] === "b" || currentPos[i][j] === "q") && !bishopHasJumpedOver(i, j, whiteKingIndex[1], whiteKingIndex[0])) inCheck = true //first diagonal bishop/queen check
            i++;
            j++;
        }   
    }

    return inCheck
}
// to do: rook check (vertical line) and knight's check 
console.log("prasd")