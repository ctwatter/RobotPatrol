
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        scene.add.existing(this); //add to existing, displaylist, update list
        this.isFiring = false;
        
        
    }

    update() {
        //left/right
        if(!this.isFiring) {
            
            if(keyLEFT.isDown && this.x >= 47){
                this.x -= 2;
            }
            else if(keyRIGHT.isDown && this.x <= 578) {
                this.x += 2;
            }
        }
        //fire button

        if (Phaser.Input.Keyboard.JustDown(keySpace) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        if(this.isFiring && this.y >= 108) {
            this.y -= 2;
        }
        if(this.y <= 108 ) {
            this.reset();
        }
    }


    reset() {
        this.isFiring = false;
        this.y = 431;
    }
}