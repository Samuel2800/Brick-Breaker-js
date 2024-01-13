function createCanvas() {
    let canvas = null;
    let ctx = null;

    const init = function() {
        canvas = document.getElementById( 
            'lienzo' 
        );

        canvas.style.backgroundColor = '#eeff00';

        ctx = canvas.getContext( 
            '2d' 
        );

        resize();
    }

    const resize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    const clear = function( ctx )  {
        ctx.fillStyle = canvas.style.backgroundColor;
        ctx.fillRect( 
            0, 
            0, 
            canvas.width, 
            canvas.height 
        );
    };

    const getContext = function() {
        return ctx;
    }

    const getWidth = function() {
        return canvas.width;
    }

    const getHeight = function() {
        return canvas.height;
    }

    return {
        init,
        getContext,
        getWidth,
        getHeight,
        resize,
        clear,
    }
}
