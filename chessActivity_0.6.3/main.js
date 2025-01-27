const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

let players = [];
let position = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

app.use((req, res, next) => { // this middleware sets players
	const ip = req.ip
	
	if (players.length < 2 && !players.includes(ip)) {
		players.push(ip);
		console.log(`${players.length == 1 ? "White" : "Black"} has been assigned to ${ip}`)
	} else if (!players.includes(ip)) {
        console.log(`The match has already begun between ${players[0]} and ${players[1]}`)
        return 
    }

    next()
})

app.use(express.static("public"))

app.use(express.json()) // let the server read JSON req

app.get("/echo/json/players", (req, res) => { // this request setup gives the players info to the client
	res.json([players, req.ip])
})
app.get("/echo/json/position", (req, res) => { // this request setup gives the players info to the client
	res.json(position)
})

app.post("/echo/json/position", (req, res) => { // this request setup gives the players info to the client
	position = (req.body.position)
	console.log("New position is: " + position)
	res.send("Position posted properly.")
})

app.listen(port);
console.log('Chess game hosting at http://localhost:' + port);
