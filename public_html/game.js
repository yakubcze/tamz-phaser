var coinsCollected = 0;
var bestScore1 = localStorage.getItem('highScore1');
var bestScore2 = localStorage.getItem('highScore2');
if (bestScore1 == null) bestScore1 = 0;
if (bestScore2 == null) bestScore2 = 0;

var timer;
var pickedItem = false;
var orbSpawned = true;
var level;
var keySpace;
var playerDirection;

var soundVolumePercent = 50;
var musicVolumePercent = 50;

localStorage.setItem('musicVolumePercent', musicVolumePercent);
localStorage.setItem('soundVolumePercent', soundVolumePercent);

class MenuScene extends Phaser.Scene {  
    constructor() 
    {
      //https://www.w3schools.com/jsref/jsref_class_super.asp  
      super({ key: 'menuScene' });
    }    
    
    preload() 
    {
        this.load.image('blue_button_0', 'assets/ui/blue_button_0.png');
        
        this.load.audio('click', 'assets/ui/click2.ogg'); 
    }
    
    create() 
    {
        //nadpis
        this.add.text(400, 100, 'TAMZ Phaser', {font: '60px monospace', fill: '#f00d0d'}).setOrigin(0.5); //nadpis:
        
        const {width, height} = this.scale;
        
        //button level 1
        const playLevel1 = this.add.image(width * 0.5, height * 0.6, 'blue_button_0').setDisplaySize(200, 50)
        this.add.text(playLevel1.x, playLevel1.y, 'Level 1', {font: '30px monospace', fill: '#ffffff'}).setOrigin(0.5)
        
        playLevel1.setInteractive();
        playLevel1.on('pointerdown', () => this.clickLevelButton1());
        
        //button level 2
        const playLevel2 = this.add.image(width * 0.5, height * 0.7, 'blue_button_0').setDisplaySize(200, 50)
        this.add.text(playLevel2.x, playLevel2.y, 'Level 2', {font: '30px monospace', fill: '#ffffff'}).setOrigin(0.5)
        
        playLevel2.setInteractive();
        playLevel2.on('pointerdown', () => this.clickLevelButton2());
        
        //button settings
        const settingsButton = this.add.image(width * 0.5, height * 0.9, 'blue_button_0').setDisplaySize(200, 50)
        this.add.text(settingsButton.x, settingsButton.y, 'Settings', {font: '30px monospace', fill: '#ffffff'}).setOrigin(0.5)
        
        settingsButton.setInteractive();
        settingsButton.on('pointerdown', () => this.clickSettingsButton());
    }
    
    clickLevelButton1()
    {
        var click = this.sound.add('click');
        click.setVolume(soundVolumePercent/100);
        click.play();
        
        this.scene.start('gameScene', {level: 1});
    }
        
    clickLevelButton2() 
    {
        var click = this.sound.add('click');
        click.setVolume(soundVolumePercent/100);
        click.play();
        
        this.scene.start('gameScene', {level: 2});
    }
    
    clickSettingsButton() 
    {
        var click = this.sound.add('click');
        click.setVolume(soundVolumePercent/100);
        click.play();
        
        this.scene.switch('settingsScene');
    }
}

class SettingsScene extends Phaser.Scene
{
    constructor() 
    {  
      super({ key: 'settingsScene' });
    }  
    
    preload() 
    {
        this.load.image('blue_button_0', 'assets/ui/blue_button_0.png');
        this.load.image('blue_button_1', 'assets/ui/blue_button_1.png');
        
        this.load.audio('click', 'assets/ui/click2.ogg');
    }
    
    create() 
    {
        const {width, height} = this.scale;
        
        //UMISTENI TLACITEK A TEXTU
        //MUSIC
        //minus a nadpis
        const musicSettingsMinus = this.add.image((width * 0.5)+40, height * 0.5, 'blue_button_1').setDisplaySize(50, 50); //image
        this.add.text(musicSettingsMinus.x, musicSettingsMinus.y, '-', {font: '30px monospace', fill: '#ffffff'}).setOrigin(0.5); //text v cudliku
        this.add.text(400, musicSettingsMinus.y-50, 'Music volume:', {font: '30px monospace', fill: '#f00d0d'}).setOrigin(0.5); //nadpis:
        //plus
        const musicSettingsPlus = this.add.image((width * 0.5)-40, height * 0.5, 'blue_button_1').setDisplaySize(50, 50); //image
        this.add.text(musicSettingsPlus.x, musicSettingsPlus.y, '+', {font: '30px monospace', fill: '#ffffff'}).setOrigin(0.5); //text v cudliku
        
        //SOUND
        //minus a nadpis
        const soundSettingsMinus = this.add.image((width * 0.5)+40, (height * 0.5)+100, 'blue_button_1').setDisplaySize(50, 50); //image
        this.add.text(soundSettingsMinus.x, soundSettingsMinus.y, '-', {font: '30px monospace', fill: '#ffffff'}).setOrigin(0.5); //text v cudliku
        this.add.text(400, soundSettingsMinus.y-50, 'Sound volume:', {font: '30px monospace', fill: '#f00d0d'}).setOrigin(0.5); //nadpis:
        //plus
        const soundSettingsPlus = this.add.image((width * 0.5)-40, (height * 0.5)+100, 'blue_button_1').setDisplaySize(50, 50); //image
        this.add.text(soundSettingsPlus.x, soundSettingsPlus.y, '+', {font: '30px monospace', fill: '#ffffff'}).setOrigin(0.5); //text v cudliku
        
        //BACKBUTTON
        const backButton = this.add.image(width * 0.5, (height * 0.5)+200, 'blue_button_0').setDisplaySize(250, 50); //image
        this.add.text(backButton.x, backButton.y, 'Save and back', {font: '30px monospace', fill: '#ffffff'}).setOrigin(0.5); //text v cudliku
        
        
        //FUNKCIONALITA TLACITEK
        //ve funkcich se meni hlasitosti a nasledne se ukladaji do localStorage
        musicSettingsMinus.setInteractive();
        musicSettingsMinus.on('pointerdown', () => this.clickMusicSettingsMinus());
        
        musicSettingsMinus.setInteractive();
        musicSettingsMinus.on('pointerdown', () => this.clickMusicSettingsMinus())
        musicSettingsPlus.setInteractive();
        musicSettingsPlus.on('pointerdown', () => this.clickMusicSettingsPlus());
        
        soundSettingsMinus.setInteractive();
        soundSettingsMinus.on('pointerdown', () => this.clickSoundSettingsMinus());
        
        soundSettingsPlus.setInteractive();
        soundSettingsPlus.on('pointerdown', () => this.clickSoundSettingsPlus());
        
        backButton.setInteractive();
        backButton.on('pointerdown', () => this.clickBackButton());
        
        this.text = this.add.text(100, 100, '', {
        font: '30px monospace',
        align: 'center',
        boundsAlignH: "center", 
        boundsAlignV: "middle", 
        fill: '#f00d0d'
        });
       this.updateText();
    }
    
    updateText() 
    {
        this.text.setText('Music volume: ' + musicVolumePercent + '%' + ' | Sound volume: ' + soundVolumePercent + '%');
    }
    
    clickMusicSettingsMinus()
    {
        var click = this.sound.add('click');
        click.setVolume(soundVolumePercent/100);
        click.play();
        
        if (musicVolumePercent > 0 && musicVolumePercent <= 100)
            musicVolumePercent -= 10;
        localStorage.setItem('musicVolumePercent', musicVolumePercent);
        
        this.updateText();
    }
    
    clickMusicSettingsPlus()
    {
        var click = this.sound.add('click');
        click.setVolume(soundVolumePercent/100);
        click.play();
        
        if (musicVolumePercent >= 0 && musicVolumePercent < 100)
            musicVolumePercent += 10;
        localStorage.setItem('musicVolumePercent', musicVolumePercent);
        
        this.updateText();
    }
    
    clickSoundSettingsMinus()
    {
        var click = this.sound.add('click');
        click.setVolume(soundVolumePercent/100);
        click.play();
        
        if (soundVolumePercent > 0 && soundVolumePercent <= 100)
            soundVolumePercent -= 10;
        localStorage.setItem('soundVolumePercent', soundVolumePercent);
        
        this.updateText();
    }
    
    clickSoundSettingsPlus()
    {
        var click = this.sound.add('click');
        click.setVolume(soundVolumePercent/100);
        click.play();
        
        if (soundVolumePercent >= 0 && soundVolumePercent < 100)
            soundVolumePercent += 10;
        localStorage.setItem('soundVolumePercent', soundVolumePercent);
        
        this.updateText();
    }
    
    clickBackButton()
    {
        var click = this.sound.add('click');
        click.setVolume(soundVolumePercent/100);
        click.play();
        
        this.scene.start('menuScene');
    }
}

class GameScene extends Phaser.Scene
{
    constructor() 
    {
      super({ key: 'gameScene' });
      this.currentLevel = 1;
      this.laserGroup;
    }    
      
    preload () 
    { 
        this.load.spritesheet('panak', 'assets/postava.png', //postava
            { frameWidth: 64, frameHeight: 64 } ); 

        this.load.spritesheet('items', 'assets/items.png', //itemy
            { frameWidth: 32, frameHeight: 32 } );
            
        this.load.spritesheet('bomba', 'assets/bomb.png', //bomba
            { frameWidth: 14, frameHeight: 14} );
            
        this.load.spritesheet('orb', 'assets/orb.png', //orb
            { frameWidth: 32, frameHeight: 32} );

        this.load.image('tiles', 'assets/map_tiles.png');
        this.load.image('tiles', 'assets/map_tiles.png');
        this.load.image('tx_grass_ground', 'assets/tx_grass_ground.png');
        this.load.image('tx_stone_ground', 'assets/tx_stone_ground.png');
        this.load.image('tx_walls', 'assets/tx_walls.png');
        this.load.image('tx_struct', 'assets/tx_struct.png');
        this.load.image('tx_props', 'assets/tx_props.png');
        this.load.image('tx_plant', 'assets/tx_plant.png');
        this.load.image('tx_shadow', 'assets/tx_shadow.png');
        this.load.image('tx_shadow_plant', 'assets/tx_shadow_plant.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('blue_button_0', 'assets/ui/blue_button_0.png');
        this.load.image('blue_button_2', 'assets/ui/blue_button_2.png');
        this.load.image('laser', 'assets/laser.png');
        
        this.load.tilemapTiledJSON('new_json_map_1', 'assets/maps/new_json_map_1.json'); //level 1
        this.load.tilemapTiledJSON('new_json_map_2', 'assets/maps/new_json_map_2.json'); //level 2
        
        this.load.audio('coin', 'assets/audio/coin.wav');
        this.load.audio('drums', 'assets/audio/orbCollision.wav');
        this.load.audio('bomba', 'assets/audio/bumbac.wav');
        this.load.audio('music', 'assets/audio/music.wav');
        this.load.audio('click', 'assets/ui/click2.ogg');
        this.load.audio('laser', 'assets/audio/laser.wav');
        this.load.audio('orbDeath', 'assets/audio/orbDeath.ogg');
    }
    
    create (data)  
    {    
        //input
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.lvl = 'new_json_map_' + data.level;
        this.map = this.make.tilemap({ key: this.lvl });
        level = (data.level);
        
        var soundVolumePercent = localStorage.getItem('soundVolumePercent'); //nacteni hlasitosti zvuku z localStorage
        var musicVolumePercent = localStorage.getItem('musicVolumePercent'); //nacteni hlasitosti hudby z localStorage
        
        //inicializace tilesetu
        this.tiles = this.map.addTilesetImage('map_tiles','tiles');
        this.txGrassGround = this.map.addTilesetImage('tx_grass_ground', 'tx_grass_ground');
        this.txStoneGround = this.map.addTilesetImage('tx_stone_ground', 'tx_stone_ground');
        this.txWalls = this.map.addTilesetImage('tx_walls', 'tx_walls');
        this.txStruct = this.map.addTilesetImage('tx_struct', 'tx_struct');
        this.txProps = this.map.addTilesetImage('tx_props', 'tx_props');
        this.txPlant = this.map.addTilesetImage('tx_plant', 'tx_plant');
        this.txShadow = this.map.addTilesetImage('tx_shadow', 'tx_shadow');
        this.txShadowPlants = this.map.addTilesetImage('tx_shadow_plant', 'tx_shadow_plant');

        //inicializace layers
        this.backgroundLayer = this.map.createDynamicLayer('background', [this.txGrassGround, this.txStoneGround], 0, 0);
        this.wallsLayer = this.map.createDynamicLayer('walls', [this.txWalls, this.txStruct], 0, 0);
        this.shadowsLayer = this.map.createDynamicLayer('shadows', [this.txShadow, this.txShadowPlants], 0, 0);
        this.propsLayer = this.map.createDynamicLayer('props', [this.txProps, this.txPlant], 0, 0);
        this.collisionLayer = this.map.createDynamicLayer('collision', this.tiles, 0, 0).setVisible(false);
        this.collisionLayer.setCollisionByExclusion([ -1 ]);

        //random spawn pro prvni coin
        var h = this.map.heightInPixels-40;
        var w = this.map.widthInPixels-40;
        var positionX = Phaser.Math.Between(40, w);
        var positionY = Phaser.Math.Between(40, h);
        this.items = this.physics.add.sprite(positionX, positionY, 'items', 9);

        //umisteni hrace
        if (level == 1)
            this.player = this.physics.add.sprite(560, 65, 'panak');
        else if (level == 2)
            this.player = this.physics.add.sprite(145, 380, 'panak');
            
        this.player.setBounce(0.1);
        
        //umisteni enemy
        if (level == 1)
            this.orb = this.physics.add.sprite(110, 530, 'orb');
        else if (level == 2)
            this.orb = this.physics.add.sprite(600, 350, 'orb');
            
        this.orb.setBounce(1);

        //bomb group
        this.bombs = this.physics.add.group();
        
        //laser group
        this.laserGroup = new LaserGroup(this);

        //coliders
        this.physics.add.collider(this.player, this.collisionLayer);
        this.physics.add.collider(this.bombs, this.collisionLayer);
        this.physics.add.collider(this.bombs, this.collisionLayer);
        this.physics.add.collider(this.laserGroup, this.collisionLayer, this.wallsBulletCollision.bind(this));
        
        //overlaps
        this.physics.add.overlap(this.player, [this.backgroundLayer, this.wallsLayer]);        
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb.bind(this));
        this.physics.add.overlap(this.player, this.items, this.collisionHandler, null, this);
        this.physics.add.overlap(this.player, this.orb, this.orbCollision.bind(this)); //orb
        this.physics.add.overlap(this.orb, this.laserGroup, this.orbBulletCollision.bind(this)); //orb
        
        //ANIMACE HRACE
        this.anims.create({
            key: 'vlevo',
            frames: this.anims.generateFrameNumbers('panak', { frames: [9, 10, 11, 12, 13, 14, 15, 16, 17] }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'vpravo',
            frames: this.anims.generateFrameNumbers('panak', { frames: [27, 28, 29, 30, 31, 32, 33, 34, 35] }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'nahoru',
            frames: this.anims.generateFrameNumbers('panak', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8] }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'dolu',
            frames: this.anims.generateFrameNumbers('panak', { frames: [18, 19, 20, 21, 22, 23, 24, 25, 26] }),
            frameRate: 20,
            repeat: -1
        });
        
        //ANIMACE ENEMY
            this.anims.create({
            key: 'orb',
            frames: this.anims.generateFrameNumbers('orb', { frames: [0, 1, 2, 3, 4, 5] }),
            frameRate: 10,
            repeat: -1
        });
        
        //score text
        this.text = this.add.text(game.canvas.width/2, 16, '', {
        fontSize: '3em',
        fontFamily: 'fantasy',
        align: 'center',
        boundsAlignH: "center", 
        boundsAlignV: "middle", 
        fill: '#ffffff'
        });  
        this.text.setOrigin(0.5);
        this.text.setScrollFactor(0);    
        this.updateText();
        
        //casovac (po uplynuti: minusPoint)
        timer = this.time.addEvent({ delay: 15000, callback: this.minusPoint, callbackScope: this, loop: true });
        
        //music
        var music = this.sound.add('music');
        music.setLoop(true);
        music.setVolume(musicVolumePercent/100);
        music.play();
        
        //tlacitko pro menu
        const {width, height} = this.scale;
        const backButton = this.add.image(width * 0.05, (height * 0.05), 'blue_button_2').setDisplaySize(25, 25); //image
        backButton.setInteractive();
        backButton.on('pointerdown', () => this.clickBackButton());
    }
    
    minusPoint()
    {
        if(!pickedItem) 
        {
            coinsCollected -= 1;
            this.updateText();
        }
    }
    
    clickBackButton()
    {
        this.scene.stop('gameScene');
        this.scene.start('menuScene');
        game.sound.stopAll();
        coinsCollected = 0;
        
        var click = this.sound.add('click');
        click.setVolume(soundVolumePercent/100);
        click.play();
    }
    
    collisionHandler(player, item) //kolize hrace s coiny
    {      
        item.disableBody(true, true);
        
        //uprava score
        coinsCollected += 1;
        if (level == 1)
        {
            if (coinsCollected > bestScore1)
                bestScore1 = coinsCollected;
        }
        else if (level == 2)
        {
            if (coinsCollected > bestScore2)
                bestScore2 = coinsCollected;
        }
        
        //spawn noveho itemu
        if (item.body.enable == false)
        {
            var h = this.map.heightInPixels-40;
            var w = this.map.widthInPixels-40;

            var itemX = Phaser.Math.Between(40, w);
            var itemY = Phaser.Math.Between(40, h);
            var tileIdx = this.collisionLayer.getTileAtWorldXY(itemX, itemY, true);

            while (tileIdx.index != -1)
            {
                itemX = Phaser.Math.Between(40, w);
                itemY = Phaser.Math.Between(40, h);
                tileIdx = this.collisionLayer.getTileAtWorldXY(itemX, itemY, true);
            }

            var itemID = 9;
            item.setFrame(itemID);
            item.enableBody(true, itemX, itemY, true, true);
        }
        
        timer.destroy();
        timer = this.time.addEvent({ delay: 15000, callback: this.minusPoint, callbackScope: this, loop: true });
        
        //ulozeni score
        if (level == 1)
            localStorage.setItem('highScore1', bestScore1);
        else if(level == 2)
            localStorage.setItem('highScore2', bestScore2);
        
        this.updateText();
        
        //zvuk
        var coinSound = this.sound.add('coin');
        coinSound.setLoop(false);
        coinSound.setVolume(soundVolumePercent/100);
        coinSound.play();
        
        //spawn bomby po sebrani coin
        var bombX = Phaser.Math.Between(40, w);
        var bombY = Phaser.Math.Between(40, h);
        this.bomb = this.bombs.create(bombX, bombY, 'bomba');
        this.bomb.setBounce(1);
        this.bomb.setCollideWorldBounds(true);
        this.bomb.setVelocity(Phaser.Math.Between(-200,200), 20);
        
        this.spawnOrb();
    }
    
    updateText()
    {
	this.text.setPosition(game.canvas.width/2 / this.map.scene.cameras.main.zoom, this.text.height);
        
        if (level == 1)
            this.text.setText('Coins collected: ' + coinsCollected + ' | Best score: ' + bestScore1);
        else if (level == 2)
            this.text.setText('Coins collected: ' + coinsCollected + ' | Best score: ' + bestScore2);
        
        this.text.setColor('white');
    }
    
    hitBomb(player, bomb) //znici bomby i hrace, prehraje zvuk, ulozi score, zmeni scenu na gameOver
    {    
        this.bomb.disableBody(true,true);
        this.player.disableBody(true, false);
        
        var explosionSound = this.sound.add('bomba');
        explosionSound.setLoop(false);
        explosionSound.setVolume(soundVolumePercent/100);
        explosionSound.play();
        
        if (level == 1)
            localStorage.setItem('highScore1', bestScore1);
        else if (level == 2)
            localStorage.setItem('highScore2', bestScore2);
        
        this.scene.switch('gameOverScene');
    }
    
    shootLaser() 
    {
	this.laserGroup.fireLaser(this.player.x, this.player.y, playerDirection);
        
        var laserSound = this.sound.add('laser');
        laserSound.setVolume(soundVolumePercent/100);
        laserSound.play();
    }

    spawnOrb()
    {
        if(!orbSpawned)
        {
            //nahodne umisteni orbu pri spawnu
            var h = this.map.heightInPixels-40;
            var w = this.map.widthInPixels-40;
            var positionX = Phaser.Math.Between(40, w);
            var positionY = Phaser.Math.Between(40, h);
            
            this.orb = this.physics.add.sprite(positionX, positionY, 'orb');

            this.orb.setBounce(1);

            this.physics.add.overlap(this.player, this.orb, this.orbCollision.bind(this)); //orb
            this.physics.add.overlap(this.orb, this.laserGroup, this.orbBulletCollision.bind(this)); //orb

            orbSpawned = true;
        }
    }
    
    orbCollision(player, orb) 
    {
        coinsCollected -= 5;
        
        this.updateText();
        
        if (level == 1)
            this.player.setPosition(720, 500);
        else if (level == 2)
            this.player.setPosition(180, 150);

        //nahodne umisteni orbu
        var h = this.map.heightInPixels-40;
        var w = this.map.widthInPixels-40;
        var positionX = Phaser.Math.Between(40, w);
        var positionY = Phaser.Math.Between(40, h);
        this.orb.setPosition(positionX, positionY);

        //zvuk
        var drumsSound = this.sound.add('drums');
        drumsSound.setLoop(false);
        drumsSound.setVolume(soundVolumePercent/100);
        drumsSound.play();
    }
    
    orbBulletCollision (orb, laserGroup) //zastreleni orbu
    {           
        orb.disableBody(true, true);
        laserGroup.destroy();
        orbSpawned = false;
        
        var orbDeathSound = this.sound.add('orbDeath');
        orbDeathSound.setLoop(false);
        orbDeathSound.setVolume(soundVolumePercent/100);
        orbDeathSound.play();
    }
    
    wallsBulletCollision(laserGroup, collisionLayer) //zniceni laseru pri narazeni na collisionLayer (zed)
    {
        laserGroup.destroy();
    }
    
    update() 
    {
        //PLAYER MOVEMENT
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-150);
            this.player.body.setVelocityY(0);
            this.player.angle = 0;
            this.player.anims.play('vlevo', true);
            playerDirection = 'vlevo';
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(150);
            this.player.body.setVelocityY(0);
            this.player.angle = 0;
            this.player.anims.play('vpravo', true); 
            playerDirection = 'vpravo';
        }
        else if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-150);
            this.player.body.setVelocityX(0);
            this.player.angle = 0;
            this.player.anims.play('nahoru', true); 
            playerDirection = 'nahoru';
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(150);
            this.player.body.setVelocityX(0);
            this.player.anims.play('dolu', true); 
            this.player.angle = 0;
            playerDirection = 'dolu';
        }
        else
        {
           this.player.body.setVelocityY(0);
           this.player.body.setVelocityX(0);
           this.player.anims.stop();
        }   
    
        //ENEMY MOVEMENT
        //horizontal
        if (this.player.x < this.orb.x && this.orb.body.velocity.x >= 0)
        {
            this.orb.body.velocity.x = -40;
            this.orb.anims.play('orb', true);
        }
        else if (this.player.x > this.orb.x && this.orb.body.velocity.x <= 0)
        {
            this.orb.body.velocity.x = 40;
            this.orb.anims.play('orb', true);
        }
        else
        {
            this.orb.body.velocity.x = 0;
            this.orb.anims.play('orb', true);
        }       
        //vertical
        if (this.player.y < this.orb.y && this.orb.body.velocity.y >= 0)
        {
            this.orb.body.velocity.y = -40;
            this.orb.anims.play('orb', true);
        }
        else if (this.player.y > this.orb.y && this.orb.body.velocity.y <= 0)
        {
            this.orb.body.velocity.y = 40;
            this.orb.anims.play('orb', true);
        }
        else 
        {
            this.orb.body.velocity.y = 0;
            this.orb.anims.play('orb', true);
        }
        
        //LASER SHOOTING
        if (Phaser.Input.Keyboard.JustDown(keySpace))
        {
            this.shootLaser();
        }
        
    }
     
}

class LaserGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene) 
        {
		super(scene.physics.world, gameScene);
 
		// Inicializace skupiny
		this.createMultiple({
			classType: Laser, //class Laser - dole
			frameQuantity: 30, // 30 instanci v poolu
			active: false,
			visible: false,
			key: 'laser'
		})
	}
        
        fireLaser(x, y, playerDirection) 
        {
            const laser = this.create();        
            laser.fire(x, y, playerDirection);
	}
}
 
class Laser extends Phaser.Physics.Arcade.Sprite 
{
	constructor(gameScene, x, y) 
        {
		super(gameScene, x, y, 'laser');
	}
        
        fire(x, y, playerDirection) 
        {
		this.body.reset(x, y);
 
		this.setActive(true);
		this.setVisible(true);
                
                //strileni do stran
                if (playerDirection === 'vpravo') {
                    this.setAngle(0);        
                    this.setVelocityX(500);
                }
                else if (playerDirection === 'vlevo') {
                    this.setVelocityX(-500);
                    this.setAngle(180);
                }
                else if (playerDirection === 'dolu') {
                    this.setVelocityY(500);
                    this.setAngle(90);
                }
                else {
                    this.setVelocityY(-500); 
                    this.setAngle(270);
                }
	}
        
        preUpdate(time, delta) //kdyby laser sel za hranice herni plochy - narazi na collisionLayer takze toto neni nutne
        {
		super.preUpdate(time, delta);
 
		if (this.y >= 600 || this.y <= 0 || this.x <= 0 || this.x >= 800) 
                {
			this.setActive(false);
			this.setVisible(false);
		}

	}
}

class GameOverScene extends Phaser.Scene
{
    constructor() 
    {  
      super({ key: 'gameOverScene' });
    }  
    
    preload() 
    {
        this.load.image('blue_button_0', 'assets/ui/blue_button_0.png');
        this.load.image('blue_button_1', 'assets/ui/blue_button_1.png');
        
        this.load.audio('click', 'assets/ui/click2.ogg');
    }
    
    create() 
    {
        this.gameOver = this.add.text(game.canvas.width/2, 16, '', {
            fontSize: '5em',
            fontFamily: 'fantasy',
            align: 'center',
            boundsAlignH: "center", 
            boundsAlignV: "middle", 
            fill: '#ffffff'
        });
        this.gameOver.setOrigin(0.5);
        this.gameOver.setScrollFactor(0); 
        this.gameOver.setPosition(game.canvas.width/2, game.canvas.height/2-100);
        this.gameOver.setText('Game Over');
        this.gameOver.setColor('red');
        
        
        this.gameOverScore = this.add.text(game.canvas.width/2, 100, '', {
            font: '30px monospace',
            align: 'center',
            boundsAlignH: "center", 
            boundsAlignV: "middle", 
            fill: '#ffffff'
        });
        this.gameOverScore.setOrigin(0.5);
        this.gameOverScore.setScrollFactor(0); 
        this.gameOverScore.setPosition(game.canvas.width/2, game.canvas.height/2);
        
        if (level == 1)
            this.gameOverScore.setText('Best score: ' + bestScore1 + '\nYour score: ' + coinsCollected );
        else if (level == 2)
            this.gameOverScore.setText('Best score: ' + bestScore2 + '\nYour score: ' + coinsCollected );
        
        this.gameOverScore.setColor('white');
        
        //replay tlacitko
        const {width, height} = this.scale;
        const replayButton = this.add.image(width * 0.5, (height * 0.5)+200, 'blue_button_0').setDisplaySize(250, 50); //image
        this.add.text(replayButton.x, replayButton.y, 'Back to menu', {font: '30px monospace', fill: '#000000'}).setOrigin(0.5); //text v cudliku
        replayButton.setInteractive();
        replayButton.on('pointerdown', () => this.clickReplayButton());

    }
        
    clickReplayButton()
    {
        this.scene.stop('gameScene');
        this.scene.start('menuScene');
        game.sound.stopAll();
        coinsCollected = 0;
        
        var click = this.sound.add('click');
        click.setVolume(soundVolumePercent/100);
        click.play();
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },           
            debug: false
        }
    },
    debug: true
};

var game = new Phaser.Game(config);

var menuScene = new MenuScene();
var gameScene = new GameScene();
var settingsScene = new SettingsScene();
var gameOverScene = new GameOverScene();

game.scene.add('menuScene', menuScene);
game.scene.add('settingsScene', settingsScene);
game.scene.add('gameScene', gameScene);
game.scene.add('gameOverScene', gameOverScene);
game.scene.start('menuScene');
