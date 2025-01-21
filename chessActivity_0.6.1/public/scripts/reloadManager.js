function reloadCheck() {
    if (players[turn % 2] !== currentPlayer) {
        setTimeout(() => {
                location.reload(true);
        }, 5000)
    }
}