
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, p) {
        super(scene, x, y, texture, frame);
        this.player = p;
        this.sfxRocket = scene.sound.add('nanners'); // add rocket sfx
        scene.add.existing(this); //add to existing, displaylist, update list
        this.isFiring = false;

        
        
    }

    update() {

        //console.log(this.player);
            //left/right
        if(this.player == 1){
            if(true) {
                
                if(keyLEFT.isDown && this.x >= 47){
                    //console.log(this.player);
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
            
        } else {
    //left/right
            if(true) {
                
                if(keyLEFT1.isDown && this.x >= 47){
                    this.x -= 2;
                }
                else if(keyRIGHT1.isDown && this.x <= 578) {
                    this.x += 2;
                }
            }
            //fire button

            if (Phaser.Input.Keyboard.JustDown(keyEnter) && !this.isFiring) {
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
        
    }


    reset() {
        this.isFiring = false;
        this.y = 430;
    }
}