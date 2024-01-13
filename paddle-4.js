function createPaddle() {
    let w = 0;
    let h = 0;
    let x = 0;
    let y = 0;
    
    const color = 'green';

    const resize = function() {
        w = window.innerWidth / 8;
        h = w / 4;

        x = (window.innerWidth - w) / 2;
        y = (window.innerHeight - h);
    };

    const checkBounds = function(        
        max ) {                              // NEW
        
        const left =   x;
        const right =  x + w;

        if ( left <= 0 )    x = 0;
        if ( right >= max ) x = max - w;
    };

    const move = function( dx, max ) {
        x += dx;

        checkBounds(
            max                              // NEW
        );
    };

    const paint = function( ctx ) {
        ctx.fillStyle = color;
        ctx.fillRect( x, y, w, h );
    };

    const getPosX = function() {
        return x;
    }

    const getPosY = function() {
        return y;
    }

    const getWidth = function() {
        return w;
    }

    const init = function() {   // NEW
        resize();
    }

    return {
        init,                   // NEW
        resize,
        checkBounds,
        move,
        paint,
        getPosX,
        getPosY,
        getWidth,
    }
};

