const { Application } = PIXI;

const app = new Application();

let players = undefined;
let currentPlayer = undefined;

(async () =>
{
    // Create a new application

	await app.init({ width: window.innerHeight * 2/3, height: window.innerHeight * 2/3});
	
	document.body.querySelector(".gamediv").appendChild(app.canvas);
	
})();


fetch("/echo/json/players", {

    method: "GET",

}).then((data) => {

    return data.json()

}).then((dataFetched) => {
    players = dataFetched[0];
	currentPlayer = dataFetched[1];
    console.log("Players fetched properly.");
	
	if (players[1] == currentPlayer) { // rotate app if black's POV
		app.stage.scale.y *= -1;
		app.stage.scale.x *= -1;
		app.stage.y = app.view.height
		app.stage.x = app.view.width
	}
})