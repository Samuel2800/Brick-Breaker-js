// factory method
function createPlayer() {

    // "private" attributes & methods
    let name = 'Jugador';         // TODO: ask for user's name
    let points = 0;
    let lives = 3;
    
    const init = function() {
        const userName = window.prompt(
            'Ingresa tu nombre:', 
            name
        );

        if ( userName && userName.length > 0 ) {
            name = userName;
        }

        document.title = name;
    }

    const incPoints = function( inc ) {         // NEW
        points += inc;
    }

    const getPoints = function() {              // NEW
        return points;
    }

    const decLives = function() {               // NEW
        lives--;
    }

    const numLives = function() {               // NEW
        return lives;
    }

    const getName = function() {               // NEW
        return name;
    }

    // return an object that contains
    // only some methods exported,
    // known as "public" methods
    return {
        init,
        incPoints,                              // NEW
        getPoints,                              // NEW
        decLives,                               // NEW
        numLives,                               // NEW
        getName,                                // NEW
    }; 
};
