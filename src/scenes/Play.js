class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    preload() {
        this.load.image('rocket', './assets/Nanners.png');
        this.load.image('joe', './assets/joe50.png');
        this.load.image('back1', './assets/testback.png');
        this.load.image('back2', './assets/testback2.png');
        this.load.image('back3', './assets/testback3.png');
        this.load.spritesheet('joeEating', './assets/joe50-Sheet.png', {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 5});

    }

    create() {
        this.back1 = this.add.tileSprite(0,0, 640, 480, 'back1').setOrigin(0,0);
        this.back2 = this.add.tileSprite(0,0, 640, 480, 'back2').setOrigin(0,0);
        this.back3 = this.add.tileSprite(0,0, 640, 480, 'back3').setOrigin(0,0);

        // this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0,0);
        // this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0,0);
        // this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0,0);
        // this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0,0);

        this.add.rectangle(37, 42, 566, 65, 0xAAAAAA).setOrigin(0,0);

        //add rocket p1
        this.p1Rocket = new Rocket(this, game.config.width/2 - 100, 400, 'rocket', 0, 1).setScale(2, 2).setOrigin(0,0);
        this.p2Rocket = new Rocket(this, game.config.width/2 + 100, 400, 'rocket', 0, 2).setScale(2, 2).setOrigin(0,0);
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'joe', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'joe', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'joe', 0, 10).setOrigin(0,0);
        
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        keyLEFT1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        




        this.anims.create({
            key: 'joeEat',
            frames: this.anims.generateFrameNumbers('joeEating', { start: 0, end: 5, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;
        this.p2Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreRight = this.add.text(470, 54, this.p2Score, scoreConfig);
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);


        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Fire (Space) to Restart of A for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        } , null, this);
    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.back1.tilePositionX -= 1;
        this.back2.tilePositionX -= 2;
        this.back3.tilePositionX -= 3;

        //update rocket
        this.p2Rocket.update();
        this.p1Rocket.update();
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03, 1);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, 1);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, 1);
        }
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03, 2);   
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02, 2);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01, 2);
        }


        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.p2Rocket.update();
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        } 
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship, player) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'joeEating').setOrigin(0, 0);
        boom.anims.play('joeEat');            // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        if(player == 1){
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score; 
        } else {
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
        }    

        this.sound.play('crunch');
    }
}