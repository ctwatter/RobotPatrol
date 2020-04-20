// Implement a simultaneous two-player mode (50)
// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (50)
// Implement parallax scrolling (15)
// Create a new title screen (15) (sorta, just a new background pic idk)
// Allow the player to control the Rocket after it's fired (10)
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
};

let game = new Phaser.Game(config);

game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000    
}

let keySpace, keyEnter, keyLEFT, keyRIGHT, keyLEFT1, keyRIGHT1;