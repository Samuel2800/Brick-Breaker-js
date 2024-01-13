// factory method
function createWall() {

    // "private" attributes & methods
    const bricksPerRow = 8;
    const numRows = 3;
    const gap = 5;

    const bricks = [];

    const init = function() {
        for ( let row = 0; row < numRows; row++ ) {
            for ( let col = 0; col < bricksPerRow; col++ ) {
                const brick = {
                    c: col,
                    r: row,
                    w: 0,
                    h: 0,
                    color: 'orangered',
                    visible: true,

                    paint: function( ctx ) {
                        if ( this.visible ) {
                            const x = this.c * (this.w + gap);
                            const y = this.r * (this.h + gap);

                            ctx.fillStyle = this.color;
                            ctx.fillRect( x, y, this.w, this.h );
                        }
                        else {
                            // NOOP
                        }
                    },

                    resize: function() {
                        this.w = (window.innerWidth - (bricksPerRow - 1) * gap) / bricksPerRow;
                        this.h = this.w / 4;    
                    },
                                    
                    getX: function() {                      // NEW
                        return this.c * (this.w + gap);
                    },
                    getY: function() {                      // NEW
                        return this.r * (this.h + gap);
                    }
                };

                bricks.push(
                    brick
                );
            }
        }

        resize();           // NEW
    };

    const paint = function( ctx ) {
        bricks.forEach( (brick) => brick.paint( ctx ) );
    };

    const resize = function() {
        bricks.forEach( (brick) => brick.resize() );
    }

    const detectBallCollision = function( ball ) {  // NEW
        let bricksDown = 0;
        
        bricks.forEach( (brick) => {
            if ( brick.visible ) {
                if ( ball.hitsBrick( brick ) ) {
                    brick.visible = false;
                    bricksDown++;
                }
            }
            else {
                // skip it
            }
        });
        
        return bricksDown;
    }

    // return an object that contains
    // only some methods exported,
    // known as "public" methods
    return {
        init,       // eq. init: init
        paint,      // idem
        resize,     // idem
        detectBallCollision                         // NEW
    }; 
};
