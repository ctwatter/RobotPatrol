class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.points = pointValue;
        this.flip = 1;
    }



    update() {
        if(this.flip == 1){
            this.x -= game.settings.spaceshipSpeed;
            //console.log("MOVE LEFT");
        } else {
            //console.log("MOVE RIGHT");
            this.x += game.settings.spaceshipSpeed; 
        }
        if(this.x <= 30) {
            //console.log("flip1");
            this.flip = 2;
        } 
        if(this.x >= game.config.width - 75) {
            this.flip = 1;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}



