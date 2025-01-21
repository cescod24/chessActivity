let dragTarget = null;

let initial_x = undefined;
let initial_y = undefined;
let initialSquare = undefined;

let sounds = [
    new Audio("./sounds/Move.mp3"),
    new Audio("./sounds/Capture.mp3"),
    new Audio("./sounds/Error.mp3"),
    new Audio("./sounds/Check.mp3"),
    new Audio("./sounds/Castle.mp3"),
]

app.stage.eventMode = 'static';
app.stage.hitArea = app.screen;
app.stage.on('pointerup', onDragEnd);
app.stage.on('pointerupoutside', onDragEnd);

function onDragMove(event)
{
    if (dragTarget)
    {
        dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    }
}

function onDragStart()
{
    // Store a reference to the data
    // * The reason for this is because of multitouch *
    // * We want to track the movement of this particular touch *
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on('pointermove', onDragMove);

    initial_x = this.x
    initial_y = this.y
    initialSquare = [Math.floor(initial_x / app.screen.width * 8), Math.floor(initial_y / app.screen.height * 8)];
}

function onDragEnd()
{
    if (dragTarget == null) {
        app.stage.off('pointermove', onDragMove);
        return
    }

    const x_destination = app.screen.width / 8 / 2 + Math.floor(dragTarget.x / app.screen.width * 8) * app.screen.width / 8;
    const y_destination = app.screen.height / 8 / 2 + Math.floor(dragTarget.y / app.screen.height * 8) * app.screen.height / 8;

    if (isSquareAvailable(x_destination, y_destination) && basicMovement(initialSquare, x_destination, y_destination)) { // move is legal

        dragTarget.x = x_destination
        dragTarget.y = y_destination
        logicManager(initialSquare, x_destination, y_destination)

        // uncomment this when isInCheck works

        /*if(isInCheck(turn)) {
            sounds[3].play()
        }*/

    } else { // move is illegal

        dragTarget.x = initial_x
        dragTarget.y = initial_y
        sounds[2].play()

    }

    dragTarget.alpha = 1;
    app.stage.off('pointermove', onDragMove);
    dragTarget = null;
}