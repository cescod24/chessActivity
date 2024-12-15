const { Application } = PIXI;

const app = new Application();

(async () =>
{
    // Create a new application

	await app.init({ width: window.innerHeight * 2/3, height: window.innerHeight * 2/3});
	
	document.body.querySelector(".gamediv").appendChild(app.canvas);
	
})();