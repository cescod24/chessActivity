let inCheck = false

let whiteKingIndex = [null, null]
let blackKingIndex = [null, null]

//who? white or black?

function isInCheck(turn){

    currentPos.forEach(row => { 
        if(row.includes("K")) whiteKingIndex = [currentPos.indexOf(row), row.indexOf("K")]
        if(row.includes("k")) blackKingIndex = [currentPos.indexOf(row), row.indexOf("k")]
        console.log(whiteKingIndex, blackKingIndex)
    });

    inCheck = false;

    turn % 2 === 0 ? who = "white" : who = "black";

    if(who === "white") {

        let kingRow = whiteKingIndex[0];
        let kingCol = whiteKingIndex[1];
        if(currentPos[kingRow - 1][kingCol - 1] === "p" || currentPos[kingRow - 1][kingCol + 1] === "p") inCheck = true //pawn check?
        
        for (let i = 1; i < 8; i++) {

            if (kingRow + i < 8 && kingCol + i < 8) {
                if ((currentPos[kingRow + i][kingCol + i] === "b" || currentPos[kingRow + i][kingCol + i] === "q") && !bishopHasJumpedOver(kingRow, kingCol, kingRow + i, kingCol + i)) {
                    inCheck = true;
                }
            }
    
            if (kingRow - i >= 0 && kingCol - i >= 0) {
                if ((currentPos[kingRow - i][kingCol - i] === "b" || currentPos[kingRow - i][kingCol - i] === "q") && !bishopHasJumpedOver(kingRow, kingCol, kingRow - i, kingCol - i)) {
                    inCheck = true;
                }
            }

            if (kingRow + i < 8 && kingCol - i >= 0) {
                if ((currentPos[kingRow + i][kingCol - i] === "b" || currentPos[kingRow + i][kingCol - i] === "q") && !bishopHasJumpedOver(kingRow, kingCol, kingRow + i, kingCol - i)) {
                    inCheck = true;
                }
            }
    
            if (kingRow - i >= 0 && kingCol + i < 8) {
                if ((currentPos[kingRow - i][kingCol + i] === "b" || currentPos[kingRow - i][kingCol + i] === "q") && !bishopHasJumpedOver(kingRow, kingCol, kingRow - i, kingCol + i)) {
                    inCheck = true;
                }
            }

            if((currentPos[kingRow][i - 1] === "r" || currentPos[i - 1][kingCol] === "r" || currentPos[kingRow][i - 1] === "q" || currentPos[i - 1][kingCol] === "q") && (!rookHasJumpedOver(0, i, kingRow, "horizontal") || !rookHasJumpedOver(0, i, kingCol, "vertical"))) {
                inCheck = true;
                console.log("rookkone")
            }

            if (
                (kingRow + 2 < 8 && kingCol - 1 >= 0 && currentPos[kingRow + 2][kingCol - 1] === "n") || 
                (kingRow + 1 < 8 && kingCol - 2 >= 0 && currentPos[kingRow + 1][kingCol - 2] === "n") || 
                (kingRow - 1 >= 0 && kingCol - 2 >= 0 && currentPos[kingRow - 1][kingCol - 2] === "n") || 
                (kingRow - 2 >= 0 && kingCol - 1 >= 0 && currentPos[kingRow - 2][kingCol - 1] === "n") || 
                (kingRow - 2 >= 0 && kingCol + 1 < 8 && currentPos[kingRow - 2][kingCol + 1] === "n") || 
                (kingRow - 1 >= 0 && kingCol + 2 < 8 && currentPos[kingRow - 1][kingCol + 2] === "n") || 
                (kingRow + 1 < 8 && kingCol + 2 < 8 && currentPos[kingRow + 1][kingCol + 2] === "n") || 
                (kingRow + 2 < 8 && kingCol + 1 < 8 && currentPos[kingRow + 2][kingCol + 1] === "n")
            ) {
                console.log("cavalloooo")
                inCheck = true;
            }
        }
    
    }

    if(who === "black") {

        let kingRow = whiteKingIndex[0];
        let kingCol = whiteKingIndex[1];
        if(currentPos[kingRow - 1][kingCol - 1] === "P" || currentPos[kingRow - 1][kingCol + 1] === "P") inCheck = true //pawn check?
        
        for (let i = 1; i < 8; i++) {

            if (kingRow + i < 8 && kingCol + i < 8) {
                if ((currentPos[kingRow + i][kingCol + i] === "B" || currentPos[kingRow + i][kingCol + i] === "Q") && !bishopHasJumpedOver(kingRow, kingCol, kingRow + i, kingCol + i)) {
                    inCheck = true;
                }
            }
    
            if (kingRow - i >= 0 && kingCol - i >= 0) {
                if ((currentPos[kingRow - i][kingCol - i] === "B" || currentPos[kingRow - i][kingCol - i] === "Q") && !bishopHasJumpedOver(kingRow, kingCol, kingRow - i, kingCol - i)) {
                    inCheck = true;
                }
            }

            if (kingRow + i < 8 && kingCol - i >= 0) {
                if ((currentPos[kingRow + i][kingCol - i] === "B" || currentPos[kingRow + i][kingCol - i] === "Q") && !bishopHasJumpedOver(kingRow, kingCol, kingRow + i, kingCol - i)) {
                    inCheck = true;
                }
            }
    
            if (kingRow - i >= 0 && kingCol + i < 8) {
                if ((currentPos[kingRow - i][kingCol + i] === "B" || currentPos[kingRow - i][kingCol + i] === "Q") && !bishopHasJumpedOver(kingRow, kingCol, kingRow - i, kingCol + i)) {
                    inCheck = true;
                }
            }

            if((currentPos[kingRow][i - 1] === "R" || currentPos[i - 1][kingCol] === "R") && (!rookHasJumpedOver(0, i, kingRow, "horizontal") || !rookHasJumpedOver(0, i, kingCol, "vertical"))) {
                inCheck = true;
            }

            if (
                (kingRow + 2 < 8 && kingCol - 1 >= 0 && currentPos[kingRow + 2][kingCol - 1] === "N") || 
                (kingRow + 1 < 8 && kingCol - 2 >= 0 && currentPos[kingRow + 1][kingCol - 2] === "N") || 
                (kingRow - 1 >= 0 && kingCol - 2 >= 0 && currentPos[kingRow - 1][kingCol - 2] === "N") || 
                (kingRow - 2 >= 0 && kingCol - 1 >= 0 && currentPos[kingRow - 2][kingCol - 1] === "N") || 
                (kingRow - 2 >= 0 && kingCol + 1 < 8 && currentPos[kingRow - 2][kingCol + 1] === "N") || 
                (kingRow - 1 >= 0 && kingCol + 2 < 8 && currentPos[kingRow - 1][kingCol + 2] === "N") || 
                (kingRow + 1 < 8 && kingCol + 2 < 8 && currentPos[kingRow + 1][kingCol + 2] === "N") || 
                (kingRow + 2 < 8 && kingCol + 1 < 8 && currentPos[kingRow + 2][kingCol + 1] === "N")
            ) {
                inCheck = true;
            }
        }

    }
    console.log("in check")
    return inCheck
}