function rebuildFEN () {
    let FENOutput = ""

    for (const row of currentPos) {
        let emptySquareCounter = 0
        for (const square of row) {
            if (square == "/") {
                emptySquareCounter++
            }
            if (square != "/") {
                if (emptySquareCounter > 0) {
                    FENOutput += String(emptySquareCounter)
                    emptySquareCounter = 0
                }
                FENOutput += square
            }
        }
        if (emptySquareCounter > 0) FENOutput += String(emptySquareCounter)

        FENOutput += "/"
    }
    FENOutput = FENOutput.slice(0, FENOutput.length - 1)

    FENOutput += turn % 2 == 0 ? " w " : " b "

    let castleString = ""
    for (let i = 0; i < 2; i++) {
        for (let j = 1; j > -1; j--) {
            castleString += whereIsCastleAvailable[i][j] ? i == 0 ? j == 1 ? "K" : "Q" : j == 1 ? "k" : "q" : ""
        }
    }
    castleString == "" ? castleString = "- " : castleString += " "

    FENOutput += castleString
	
	if (isEnpassantPossibleData[0]) {
		FENOutput += "abcdefgh"[isEnpassantPossibleData[1][0]] + (turn % 2 == 0 ? 6 : 3) + " 0 "
	} else {
		FENOutput += "- 0 "
	}

	FENOutput += Math.floor(turn / 2) + 1
	
	return FENOutput
    
}

function postNewFEN (position) {
    fetch("/echo/json/position", {

		method: "POST",
		headers: {
		'Accept': 'application.json',
		'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			position: position,
		}),

	}).then((data) => {

    return data.text()

	}).then((body) => {
		console.log(body)
        setTimeout(() => {
            location.reload(true);
        }, 2000)
	})
}