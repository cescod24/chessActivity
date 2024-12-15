const { Assets, Sprite, SCALE_MODES } = PIXI;

let piecesSprites = []

let random = undefined

let whiteKingIndex = []
let blackKingIndex = []

for (let i = 0; i < 64; i++) {
    piecesSprites.push(undefined)
}

// Add Assets to the scene, EDIT: capital letter = White
Assets.add({ alias: 'b', src: './images/bB.png' });
Assets.add({ alias: 'k', src: './images/bK.png' });
Assets.add({ alias: 'n', src: './images/bN.png' });
Assets.add({ alias: 'p', src: './images/bP.png' });
Assets.add({ alias: 'q', src: './images/bQ.png' });
Assets.add({ alias: 'r', src: './images/bR.png' });
Assets.add({ alias: 'B', src: './images/wB.png' });
Assets.add({ alias: 'K', src: './images/wK.png' });
Assets.add({ alias: 'N', src: './images/wN.png' });
Assets.add({ alias: 'P', src: './images/wP.png' });
Assets.add({ alias: 'Q', src: './images/wQ.png' });
Assets.add({ alias: 'R', src: './images/wR.png' });

// Starting position depending on color

const startingPosFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"; // FEN notation starting position
const sampleFEN = "r3rnk1/pbq2ppp/1p2pN2/2p5/2PP3P/3B1N2/PPQ2PP1/1K1R3R b - - 0 16" // test sample FEN position

setupPositionFEN(sampleFEN)

// Select a pre-built position with FEN notation (e.g puzzles) SOURCE: https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
async function setupPositionFEN(position) {
    let posIndex = 0; // Index in FEN position string
    let boardIndex = 0; // (0-63) Board square

    while (boardIndex < 64) { // Sets up the position

        const pieceAlias = position[posIndex];

        if (pieceAlias === " " || pieceAlias === "/") {
            posIndex++;
        } else if (!isNaN(Number(pieceAlias))) {
            for (let i = 0; i < Number(pieceAlias); i++) {
                currentPos[Math.floor(boardIndex / 8)].push("/")
                currentToIndex[Math.floor(boardIndex / 8)].push(boardIndex)
                boardIndex++;
            }
            posIndex++;
        } else {
            await placePiece(boardIndex, pieceAlias);
            currentPos[Math.floor(boardIndex / 8)].push(pieceAlias)
            currentToIndex[Math.floor(boardIndex / 8)].push(boardIndex)
            pieceAlias === "K" ? whiteKingIndex = [Math.floor(boardIndex / 8), boardIndex % 8] : pieceAlias === "k" ? blackKingIndex = [Math.floor(boardIndex / 8), boardIndex % 8] : {};
            boardIndex++;
            posIndex++;
        }
    }
    
    console.log(currentPos, currentToIndex, whiteKingIndex, blackKingIndex)
    printGameInfo(position, posIndex)
}

async function placePiece(squareNum, pieceAlias) { //pieceAlias == position[index]

    if (pieceAlias == "/") return // return if there's no pieces to place

    //console.log(squareNum, pieceAlias)
    const pieceTexture = await Assets.load(pieceAlias); // Load the textures for this specific piece
    pieceTexture.baseTexture.scaleMode = SCALE_MODES.NEAREST; // don't lose quality if rescaling too big
    const piece = new Sprite(pieceTexture); // create a sprite with the desired asset

    // Enable the piece to be interactive... this will allow it to respond to mouse and touch events
    piece.eventMode = 'static';

    // This button mode will mean the hand cursor appears when you roll over the bunny with your mouse
    piece.cursor = 'pointer';

    // Center the piece's anchor point
    piece.anchor.set(0.5);

    // Rescale the piece
    piece.scale.set(1 / 2048 / 8 * app.screen.width);

    // Setup events for mouse + touch using the pointer events
    piece.on('pointerdown', onDragStart, piece);

    // Move the sprite to its designated position
    piece.x = app.screen.width / 8 / 2 + app.screen.width / 8 * (squareNum % 8);
    piece.y = app.screen.height / 8 / 2 + app.screen.height / 8 * (Math.floor(squareNum / 8));

    // Add it to the stage
    app.stage.addChild(piece);

    piecesSprites[squareNum] = piece
}

function printGameInfo(position, posIndex) {

    const gameInfo = {
        turn: "",
        castle: "",
        enPassantSquare: "-",
        halfmoves: 0,
        fullmoves: 0,
    }

    posIndex++;

    if (posIndex < position.length) {
        if(position[posIndex] === "w") {
            gameInfo.turn = "White's turn"
            turn = 0
        } else if (position[posIndex] === "b") {
            gameInfo.turn = "Black's turn"
            turn = 1
        } else {gameInfo.turn = "N/A"}

        posIndex += 2;

        if(position[posIndex] === "-"){
            gameInfo.castle = "No castling available for both sides";
            posIndex += 2;
        }
        else {
            while(position[posIndex] !== " ") {

                switch(position[posIndex]) {
                    case "K":
                        gameInfo.castle = gameInfo.castle + "White kingside, ";
                        whereIsCastleAvailable[0][1] = true;
                        break;
                    case "Q":
                        gameInfo.castle = gameInfo.castle + "White queenside; ";
                        whereIsCastleAvailable[0][0] = true;
                        break;
                    case "k":
                        gameInfo.castle = gameInfo.castle + "Black kingside, ";
                        whereIsCastleAvailable[1][1] = true;
                        break;
                    case "q":
                        gameInfo.castle = gameInfo.castle + "Black queenside; ";
                        whereIsCastleAvailable[1][0] = true;
                        break;
                }
                posIndex++;
            }

            posIndex++
        }

        if(position[posIndex] === "-"){
            gameInfo.enPassantSquare = "No en passant possible";
            posIndex += 2;
        } else {
            gameInfo.enPassantSquare = "En passant possible at " + position[posIndex] + position[posIndex + 1]
            posIndex += 3;
        }
        

        let halfmovesNumberString = ""
        gameInfo.halfmoves = "Halfmoves: "
        while(position[posIndex] !== " ") {
            gameInfo.halfmoves += position[posIndex]
            halfmovesNumberString += position[posIndex]
            posIndex++;
        }
        posIndex++;

        let fullmovesNumberString = ""
        gameInfo.fullmoves = "fullmoves: "
        while(posIndex < position.length) {
            gameInfo.fullmoves += position[posIndex]
            fullmovesNumberString += position[posIndex]
            posIndex++;
        }

    }

    console.log(gameInfo)

}