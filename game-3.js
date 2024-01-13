// factory method
function createGame() {

    // "private" attributes & methods
    const canvas = createCanvas();
    const wall   = createWall();
    const ball   = createBall();
    const paddle = createPaddle();
    const player = createPlayer();

    let paused = false;             // NEW

    const resize = function() { 
        canvas.resize();
        wall.resize();
        ball.resize();
        paddle.resize();
    }

    const init = function() {
        canvas.init();
        wall.init();
        ball.init();
        paddle.init();
        player.init();

        // register for resize events
        window.onresize = resize;

        paint();
    }

    function detectBallWallCollision() {
        const bricksHit = wall.detectBallCollision( 
            ball 
        );

        player.incPoints(
            bricksHit
        );

        document.title = player.getName() 
            + ' ['
            + player.getPoints()
            + ' POINTS]';
    }
    
    function detectCollisions() {
        if ( ball.detectPaddleCollision( paddle ) ) {
            return;
        }
        
        detectBallWallCollision();
    }
    
    const paint = function() {
        if ( player.numLives() == 0 ) {
            document.title = 'GAME OVER ['
                + player.getPoints()
                + ' POINTS]';
            return;
        }

        if ( paused ) {
            return;
        }

        const ctx = canvas.getContext();
        if ( ctx ) { 
            canvas.clear( ctx );
            wall.paint( ctx );
            paddle.paint( ctx );
            
            if ( ball.paint( canvas ) ) {            
                detectCollisions();
            }
            else {
                player.decLives();
                ball.init();

                paused = true;
            }

            window.requestAnimationFrame(
                paint
            );
        }
    }
    
    window.onkeydown = function( e ) {
        e.preventDefault();         // do not bubble

        if ( e.code == 'Space' ) {
            paused = !paused;

            if ( !paused ) {
                window.requestAnimationFrame(
                    paint
                );
            }
        }
        else if ( e.code == 'ArrowLeft' ) {
            paddle.move( -40, canvas.getWidth() );
        }
        else if ( e.code == 'ArrowRight' ) {
            paddle.move( +40, canvas.getWidth() );
        }
    };

    // "public interface"
    return {
        init
    }; 
};
