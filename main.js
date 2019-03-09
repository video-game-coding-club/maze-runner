var gameData = {
  level: -1,
  gameOver: false
};

class SplashScreen extends Phaser.Scene {
  constructor() {
    super("SplashScreen");
  };

  progressBar() {
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      console.log(value);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
      percentText.setText(parseInt(value * 100) + '%');
    });

    this.load.on('fileprogress', function (file) {
      console.log(file.src);
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
      console.log('complete');
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }

  preload() {
    this.progressBar();
    this.load.audio("background_music", "assets/Ove - Earth Is All We Have .ogg");
    this.load.audio("coin", "assets/coin.mp3");
    this.load.audio("title_music", "assets/Maze Runner Level Select Music.mp3");
    this.load.image("button", "assets/button.png");
    this.load.image("energyEmpty", "assets/emergy_bar_empty.png");
    this.load.image("energyFull", "assets/emergy_bar_full.png");
    this.load.image("explosion", "assets/explosion.png");
    this.load.image("gameOver", "assets/game_over.png");
    this.load.image("healthStatus", "assets/health_status.png");
    this.load.image("heartIcon", "assets/heart_green_frame.png");
    this.load.image("levelComplete", "assets/level_complete.png");
    this.load.image("splash", "assets/splash_screen.png");
    this.load.image("tiles", "assets/tiles.png");
    this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 24, frameHeight: 32 });
    this.load.spritesheet("heart", "assets/heart.png", { frameWidth: 10, frameHeight: 10 });
    this.load.spritesheet("lava", "assets/lava.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("torch", "assets/animated_torch_small.png", { frameWidth: 16, frameHeight: 32 });
    this.load.tilemapTiledJSON("map_0", "assets/map-level-0.json");
    this.load.tilemapTiledJSON("map_1", "assets/map-level-1.json");
    this.load.tilemapTiledJSON("map_2", "assets/map-level-2.json");
    this.load.tilemapTiledJSON("map_3", "assets/map-level-3.json");
    this.load.tilemapTiledJSON("map_4", "assets/map-level-4.json");
  }

  create() {
    let splash = this.add.sprite(this.scale.width / 2, this.scale.height / 2, "splash");
    this.input.keyboard.on("keydown", () => {
      this.scene.start("SelectLevel");
    });
    this.messageShown = false;
  }

  update(time, delta) {
    if (time > 2000 && !this.messageShown) {
      let message = this.make.text({
        x: this.cameras.main.width / 2,
        y: 100,
        text: "Press any key to start the game",
        style: {
          font: "30px monospace",
          fill: "#ffffff"
        }
      });
      message.setOrigin(0.5, 0.5);
      message.setStroke("#101010", 3);
      message.setShadow(10, 10, "#000000", 5, true);
      this.messageShown = true;
    }
  }
}

class Credits extends Phaser.Scene {
  constructor() {
    super("Credits");
  }

  create() {
    let creditOffsetX = 340;
    let creditOffsetY = 0;
    let titleStyle = {
      fontSize: "64px",
      fill: "#ffffff",
      stroke: "#202020"
    };
    let headerStyle = {
      fontSize: "48px",
      fill: "#ffffff",
      stroke: "#202020"
    };
    let paragraphStyle = {
      fontSize: "24px",
      fill: "#ffffff",
      stroke: "#202020"
    };
    this.initialCameraOffset = -600;
    this.cameraOffset = 0;
    this.add.text(creditOffsetX, creditOffsetY, "Maze Runner", titleStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 120), "Game Design", headerStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 50), "(in alphabetical order)", paragraphStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 80), "Adis Bock (@adisbock)", paragraphStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 40), "Levi Gibson (@LeviCodes)", paragraphStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 40), "Lucas Price (@lucasprice)", paragraphStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 40), "Zach Gibson (@zachgib)", paragraphStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 100), "Level Design", headerStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 80), "Level 1 - Adis Bock", paragraphStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 40), "Level 2 - Lucas Price", paragraphStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 40), "Level 3 - Zach Gibson", paragraphStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 40), "Level 4 - Levi Gibson", paragraphStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 100), "Artwork", headerStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 80), "https://opengameart.org/", paragraphStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 100), "Music", headerStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 80), "https://opengameart.org/", paragraphStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 100), "Sound effects", headerStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 80), "https://opengameart.org/", paragraphStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 100), "Special Thanks", headerStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 80), "The Phaser.io framework and", paragraphStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 30), "the awesome Phaser community!", paragraphStyle);
    this.add.text(creditOffsetX, (creditOffsetY += 40), "https://photonstorm.github.io/", paragraphStyle);
    this.creditsLength = creditOffsetY + 600;
  }

  update(time, delta) {
    this.cameraOffset = (this.cameraOffset + 0.03 * delta) % this.creditsLength;
    this.cameras.main.setScroll(0, this.initialCameraOffset + this.cameraOffset);
  }
}

class SelectLevel extends Phaser.Scene {
  constructor() {
    super("SelectLevel");
  }

  create() {
    this.button = [];
    this.buttonText = [];
    for (let i = 0; i < 5; i++) {
      this.button[i] = this.add.sprite(150, 60 + i * 80, "button");
      this.button[i].setScale(0.3, 0.15);
      this.buttonText[i] = this.add.text(80, 40 + i * 80, 'Level ' + i,
                                         {
                                           fontSize: '32px',
                                           fill: '#ffffff',
                                           stroke: "#202020",
                                           strokeThickness: 3,
                                           shadowOffsetX: 5,
                                           shadowOffsetY: 5,
                                           shadowBlur: 2,
                                           shadowColor: "#101010"
                                         });
    }
    this.levelControls = this.input.keyboard.addKeys({
      "zero": Phaser.Input.Keyboard.KeyCodes.ZERO,
      "one": Phaser.Input.Keyboard.KeyCodes.ONE,
      "two": Phaser.Input.Keyboard.KeyCodes.TWO,
      "three": Phaser.Input.Keyboard.KeyCodes.THREE,
      "four": Phaser.Input.Keyboard.KeyCodes.FOUR
    });
    this.sound.stopAll();
    this.background_music = this.sound.add("title_music", { loop: true });
    this.background_music.play();

    this.scene.launch("Credits");
  }

  playLevel(level) {
    gameData.level = level;
    this.scene.stop("Credits");
    this.scene.start("PlayLevel");
  }

  update(time, delta) {
    if (this.levelControls.zero.isDown) {
      this.playLevel(0);
    } else if (this.levelControls.one.isDown) {
      this.playLevel(1);
    } else if (this.levelControls.two.isDown) {
      this.playLevel(2);
    } else if (this.levelControls.three.isDown) {
      this.playLevel(3);
    } else if (this.levelControls.four.isDown) {
      this.playLevel(4);
    }
  }
}

class PlayLevel extends Phaser.Scene {
  constructor() {
    super("PlayLevel");
  }

  create() {
    /* Create the map. */
    this.map = this.make.tilemap({
      key: "map_" + gameData.level,
      tileWidth: 32,
      tileHeight: 32
    });
    /* Resize world to fit the level. */
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    /* Create tileset for background. */
    this.backgroundTiles = this.map.addTilesetImage("tiles");

    /* Add lava tiles. */
    this.lavaTiles = this.map.addTilesetImage("lava");

    /* Create background layer. */
    this.backgroundLayer = this.map.createStaticLayer("background", this.backgroundTiles);

    /* Create the game layer. */
    this.gameLayer = this.map.createDynamicLayer("game", this.backgroundTiles);

    /* Create Dude animations. */
    this.anims.create({
      key: "stand",
      frames: [ { key: "dude", frame: 2 } ]
    });

    this.anims.create({
      key: "jump",
      frames: [ { key: "dude", frame: 0 } ]
    });

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers("dude", { start: 1, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    /* Create the heart animation. */
    this.anims.create({
      key: "glimmer",
      frames: this.anims.generateFrameNumbers("heart"),
      frameRate: 5,
      repeat: -1
    });

    /* Create torches. */
    this.anims.create({
      key: "flicker",
      frames: this.anims.generateFrameNumbers("torch"),
      frameRate: 4,
      repeat: -1
    });

    this.torches = this.map.createFromObjects("objects", "torch", { key: "torch" });
    this.torches.forEach( t => {
      this.physics.add.existing(t);
      t.anims.play("flicker");
    });

    /* Add the dude. */
    let dudeObject = this.map.findObject("objects", o => { return o.name === "dude"; });
    this.dude = this.physics.add.sprite(dudeObject.x, dudeObject.y, "dude");
    this.dude.setBounce(0.2);
    this.dude.setGravityY(300);
    this.dude.setCollideWorldBounds(true);

    /* Create foreground layer. We need to create this layer _after_
     * we add the dude sprite so that the dude is hidden by this
     * layer. */
    this.foregroundLayer = this.map.createStaticLayer("foreground", this.lavaTiles);

    /* This will watch the player and layer every frame to check for
       collisions. */
    this.gameLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.dude, this.gameLayer);

    /* Check whether the Dude is leaving. */
    this.gameLayer.setTileIndexCallback(19, this.dudeIsLeaving, this);

    this.anims.create({
      key: "lava",
      frames: this.anims.generateFrameNumbers("lava"),
      frameRate: 1,
      repeat: -1
    });

    /* Create the lava. */
    this.lavaTiles = this.physics.add.staticGroup();
    this.gameLayer.forEachTile(tile => {
      if (tile.properties.type === "lava") {
        const x = tile.getCenterX();
        const y = tile.getCenterY();
        const lava = this.lavaTiles.create(x, y, "lava");
        lava.anims.play("lava");
        this.gameLayer.removeTileAt(tile.x, tile.y);
      }
    });

    /* Create the hearts. */
    this.hearts = this.map.createFromObjects("objects", "heart", { key: "heart" });
    this.hearts.forEach( h => {
      this.physics.add.existing(h);
      h.anims.play("glimmer");
    });
    this.physics.add.overlap(this.dude, this.hearts, this.collectHearts, null, this);

    /* Add keyboard controls. */
    this.controls = this.input.keyboard.addKeys({
      "up": Phaser.Input.Keyboard.KeyCodes.UP,
      "left": Phaser.Input.Keyboard.KeyCodes.LEFT,
      "right": Phaser.Input.Keyboard.KeyCodes.RIGHT,
      "back": Phaser.Input.Keyboard.KeyCodes.BACKSPACE
    });

    /* Set up the camera. */
    this.cameras.main.startFollow(this.dude);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setZoom(2);

    /* Setup the sound. */
    this.sound.stopAll();
    this.background_music = this.sound.add("background_music", { loop: true });
    this.background_music.play();

    this.heartSoundEffect = this.sound.add("coin");

    /* Launch the status display. */
    this.heartPoints = 0;
    this.healthPoints = 100;
    this.scene.launch("StatusDisplay");

    gameData.gameOver = false;
    gameData.levelComplete = false;
  }

  update(time, delta) {
    if (gameData.levelComplete) {
      this.dude.anims.play("stand");
      return;
    }

    if (this.controls.back.isDown) {
      this.scene.stop("StatusDisplay");
      this.scene.start("SelectLevel");
    }

    if (this.controls.right.isDown) {
      this.dude.setFlipX(false);
      this.dude.setVelocityX(100);
      this.dude.anims.play("walk", true);
    } else if (this.controls.left.isDown) {
      this.dude.setFlipX(true);
      this.dude.setVelocityX(-100);
      this.dude.anims.play("walk", true);
    } else {
      /* Stop any previous movement. */
      this.dude.setVelocityX(0);
      this.dude.anims.play("stand");
    }

    if (this.controls.up.isDown) {
      if (this.dude.body.onFloor()) {
        this.dude.setVelocityY(-130);
      } else if (this.dude.body.onWall()) {
        this.dude.setVelocityY(-50);
      }
    }

    if (!(this.dude.body.onFloor() || this.dude.body.onWall())) {
      this.dude.anims.play("jump");
    }

    if (this.physics.world.overlap(this.dude, this.lavaTiles)) {
      console.log("The dude in lava");
      this.healthPoints -= 0.1;
      if (this.healthPoints <= 0) {
        gameData.gameOver = true;
        this.scene.stop("StatusDisplay");
        this.scene.start("GameOver");
      } else {
        this.scene.get("StatusDisplay").setHealthPoints(this.healthPoints);
      }
    }
  }

  collectHearts(dude, heart) {
    heart.destroy();
    this.healthPoints += 20;
    if (this.healthPoints > 100) {
      this.healthPoints = 100;
    }
    this.heartSoundEffect.play();
    this.scene.get("StatusDisplay").setHealthPoints(this.healthPoints);
  }

  dudeIsLeaving(dude, tile) {
    if (gameData.levelComplete) {
      return;
    }

    gameData.levelComplete = true;
    console.log("The dude is leaving");
    this.physics.pause();
    this.cameras.main.fade(1000, 0, 0, 0, false, this.dudeIsOut);
  }

  dudeIsOut(camera, progress) {
    if (progress === 1) {
      this.scene.stop("StatusDisplay");
      this.scene.start("LevelComplete");
    }
  }
}

class StatusDisplay extends Phaser.Scene {
  constructor() {
    super("StatusDisplay");
  }

  create() {
    this.healthStatus = this.add.sprite(100, 30, "healthStatus");
    this.healthStatus.setScale(1.8);
  }

  setHealthPoints(healthPoints) {
    this.healthStatus.setCrop(0, 0, this.healthStatus.width * healthPoints / 100, this.healthStatus.height);
  }
}

class LevelComplete extends Phaser.Scene {
  constructor() {
    super("LevelComplete");
  }

  create() {
    this.levelComplete = this.add.sprite(this.scale.width / 2, this.scale.height / 2, "levelComplete");
    this.levelComplete.setScale(0.8);
    this.controls = this.input.keyboard.addKeys({
      "back": Phaser.Input.Keyboard.KeyCodes.BACKSPACE
    });
  }

  update(time, delta) {
    if (this.controls.back.isDown) {
      this.scene.start("SelectLevel");
    }
  }
}

class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.gameOver = this.add.sprite(this.scale.width / 2, this.scale.height / 2, "gameOver");
    this.gameOver.setScale(0.2);
    this.controls = this.input.keyboard.addKeys({
      "back": Phaser.Input.Keyboard.KeyCodes.BACKSPACE
    });
  }

  update(time, delta) {
    if (this.controls.back.isDown) {
      this.scene.start("SelectLevel");
    }
  }
}

window.onload = function() {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
      mode: Phaser.Scale.RESIZE
    },
    physics: {
      default: "arcade",
      acrcade: {
        debug: true,
        gravity: {
          y: 300
        }
      }
    },
    scene: [
      SplashScreen,
      Credits,
      SelectLevel,
      PlayLevel,
      StatusDisplay,
      GameOver,
      LevelComplete
    ],
    audio: {
      disableWebAudio: true
    }
  };

  const game = new Phaser.Game(config);
};
