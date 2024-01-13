function createBall() {
    // private
    let x = 0;
    let y = 0;
    let dx = 3;     // start moving right 
    let dy = 3;     // start moving down
    let r = 0;
    
    const color = 'blue';

    const resize = function() {
        r = window.innerWidth / 40;
    };

    const checkBounds = function(
        canvas ) {

        const left =   x - (r / 2);
        const right =  x + (r / 2);
        const top =    y - (r / 2);
        const bottom = y + (r / 2);

        if ( left <= 0 )                    dx = -dx;
        if ( right >= canvas.getWidth() )   dx = -dx;
        if ( top <= 0 )                     dy = -dy;

        if ( bottom >= canvas.getHeight() ) {   // NEW
            return false;
        }

        return true;                            // NEW
    };

    const move = function(
        canvas ) {

        x += dx;
        y += dy;

        return checkBounds(                     // NEW
            canvas 
        );
    };

    const paint = function( 
        canvas ) {

        const ctx = canvas.getContext();

        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.arc( 
            x,
            y,
            r,
            0,
            2 * Math.PI,
        );
        ctx.fill();
        ctx.closePath();
        
        return move(
            canvas
        );
    };

    const getPosX = function() {
        return x;
    }

    const getPosY = function() {
        return y;
    }

    const getRadius = function() {
        return r;
    }

    const invertDeltaY = function() {
        dy = -dy;
    }

    const detectPaddleCollision = function( 
        paddle ) {

        if ( dy < 0 ) {
            // going up
            return false;
        }
    
        const ballLeft   = getPosX();
        const ballRight  = getPosX();
        const ballBottom = getPosY() + getRadius();
    
        const paddleLeft  = paddle.getPosX();
        const paddleRight = paddle.getPosX() + paddle.getWidth();
        const paddleTop   = paddle.getPosY();
    
        const collision = ballLeft >= paddleLeft
            && ballRight <= paddleRight
            && ballBottom >= paddleTop;

        if ( collision ) {
            invertDeltaY();
        }

        return collision;
    }

    const init = function() {
        resize();

        x = window.innerWidth / 2;      // NEW
        y = window.innerHeight / 2;     // NEW
    }

    const bottomBrickCollision = function(
        brick ) {
    
        const brickBottom = brick.getY() + brick.h;
        const brickLeft   = brick.getX();
        const brickRight  = brick.getX() + brick.w;

        const ballTop = y - r;
    
        return x >= brickLeft
            && x <= brickRight
            && ballTop <= brickBottom
            && dy < 0;            // ball is going up
    }

    const hitsBrick = function( 
        brick ) {

        if ( bottomBrickCollision( brick ) ) {
            invertDeltaY();
            return true;
        }
        // TODO
        // if ( topBrickCollision( brick ) ) {
        //     invertDeltaY();
        //     return true;
        // }
        // if ( leftBrickCollision( brick ) ) {
        //     invertDeltaX();
        //     return true;
        // }
        // if ( rightBrickCollision( brick ) ) {
        //     invertDeltaX();
        //     return true;
        // }
                
        return false;
    }

    return {
        init,                   // NEW
        resize,
        checkBounds,
        move,
        paint,
        detectPaddleCollision,
        hitsBrick
    };
};

