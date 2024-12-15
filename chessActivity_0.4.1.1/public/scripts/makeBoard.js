const { GraphicsContext, Graphics } = PIXI;

// Load the textures

let lightColor = "#f2c48d"
let darkColor = "#694417"

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        let isLightSquare = (i + j) % 2 == 0

        let color = (isLightSquare) ? lightColor : darkColor
        let position_x = i * window.innerHeight * 2/3 / 8
        let position_y = j * window.innerHeight * 2/3 / 8
        
        drawSquare(color, position_x, position_y)
    }
}

function drawSquare(color, x, y) {
    // Create the chessboard..
    const squareContext = new GraphicsContext()
    .rect(0, 0, app.screen.width / 8, app.screen.height / 8)
    .fill(color);

    const squareGraphics = new Graphics(squareContext);

    // Move the sprite to its designated position
    squareGraphics.x = x;
    squareGraphics.y = y;

    // Add it to the stage
    app.stage.addChild(squareGraphics);
}