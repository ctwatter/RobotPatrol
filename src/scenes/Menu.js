class Menu extends Phaser.Scene {
    constructor(){
        super("memuScene")
    }

    preload() {
        this.load.image('menuBack', './assets/joe.png');
      
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('crunch', './assets/crunch.wav');
        this.load.audio('nanners', './assets/nanners.wav');
    }

    create() {
        //this.add.text(20, 20, "Rocket Patrol Menu");
        this.menuBack = this.add.tileSprite(0,-100, 640, 600, 'menuBack').setOrigin(0,0);

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FACADE',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, 'Joe Pera needs his breakfast.', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px';
        this.add.text(centerX, centerY, 'Player 1: A and D to move and Space to fire', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, 'Player 2: <- and -> to move and Enter to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FFFF';
        menuConfig.color = '#000';
        menuConfig.fontSize = '28px';
        this.add.text(centerX, centerY + (textSpacer * 2), 'press A for easy or D for hard', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px';
        this.add.text(centerX, centerY + (textSpacer * 3), 'please give this man his nanners on cereal', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        keyLEFT1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}