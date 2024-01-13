const wall = createWall();
const ball = createBall();
const paddle = createPaddle();

// init brick wall
wall.init();

function ballPaddleCollision() {    // NEW
    return ball.detectCollision(
        paddle
    );
}

function detectWallCollision() {
    // TODO
}

function detectCollisions() {
    if ( ballPaddleCollision() ) {
        return;
    }
    
    detectWallCollision();
}

function drawGame() {
    if ( paused ) {
        return;
    }

    canvas.clear( ctx );

    wall.paint( ctx );
    ball.paint( ctx );
    paddle.paint( ctx );

    detectCollisions();    // NEW

    window.requestAnimationFrame(
        drawGame
    );
}

function resize() {
    canvas.resize();
    wall.resize();
    ball.resize();
    paddle.resize();

    drawGame();
}

resize();

// register resize() as a callback for resize events
window.onresize = resize;

// launch game
window.requestAnimationFrame(
    drawGame
);

