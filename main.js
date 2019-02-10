var gameData = {
  level: -1
};

window.onload = function() {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      acrcade: {
        debug: true,
        gravity: {
          y: 300
        }
      }
    },
    scene: [ splashScreen, selectLevel, playLevel ],
    audio: {
      disableWebAudio: true
    }
  };

  const game = new Phaser.Game(config);
};

class splashScreen extends Phaser.Scene {
  constructor() {
    super("SplashScreen");
  };

  preload() {
    this.load.image("splash", "assets/splash_screen.png");
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

class selectLevel extends Phaser.Scene {
  constructor() {
    super("SelectLevel");
  }

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
    /* Set up the progress bar. */
    //this.progressBar();
    this.load.image("button", "assets/button.png");
  }

  create() {
    this.button = [];
    this.buttonText = [];
    for (let i = 0; i < 4; i++) {
      this.button[i] = this.add.sprite(150, 60 + i * 80, "button");
      this.button[i].setScale(0.3, 0.15);
      this.levelControls = this.input.keyboard.addKeys({
        "one": Phaser.Input.Keyboard.KeyCodes.ONE,
        "two": Phaser.Input.Keyboard.KeyCodes.TWO,
        "three": Phaser.Input.Keyboard.KeyCodes.THREE,
        "four": Phaser.Input.Keyboard.KeyCodes.FOUR
      });
      this.buttonText[i] = this.add.text(80, 40 + i * 80, 'Level ' + (i + 1),
                                         {
                                           fontSize: '32px',
                                           fill: '#ffffff',
                                         });
      this.buttonText[i].setStroke("#101010", 3);
      this.buttonText[i].setShadow();
    }
  }

  update() {
    if (this.levelControls.one.isDown) {
      gameData.level = 1;
      this.scene.start("PlayLevel");
    } else if (this.levelControls.two.isDown) {
      gameData.level = 2;
      this.scene.start("PlayLevel");
    } else if (this.levelControls.three.isDown) {
      gameData.level = 3;
      this.scene.start("PlayLevel");
    } else if (this.levelControls.four.isDown) {
      gameData.level = 4;
      this.scene.start("PlayLevel");
    }
  }
}

class playLevel extends Phaser.Scene {
  constructor() {
    super("PlayLevel");
  }

  preload() {
    this.load.image("tiles", "assets/tiles.png");
    this.load.tilemapTiledJSON("map", "assets/map.json");
    this.load.spritesheet("dude", "assets/dude.png",
                          { frameWidth: 24,
                            frameHeight: 32
                          });
    this.load.spritesheet("heart", "assets/heart.png",
                          { frameWidth: 10,
                            frameHeight: 10
                          });
    this.load.audio("background_music",
                    "assets/Ove - Earth Is All We Have .ogg");
  }

  create() {
    /* Create the map. */
    this.map = this.make.tilemap({
      key: "map",
      tileWidth: 32,
      tileHeight: 32
    });
    this.tiles = this.map.addTilesetImage("tiles");
    this.layer = this.map.createStaticLayer(gameData.level - 1, this.tiles);
    this.map.setCollisionBetween(0, 22, this.layer);

    /* Resize world to fit the level. */
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    /* Add the dude. */
    this.dude = this.physics.add.sprite(10, 10, "dude");
    this.dude.setBounce(0.2);
    this.dude.setGravityY(300);
    this.dude.setCollideWorldBounds(true);

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

    /* This will watch the player and layer every frame to check for
       collisions. */
    this.physics.add.collider(this.dude, this.layer);

    /* Create the hearts. */
    this.anims.create({
      key: "glimmer",
      frames: this.anims.generateFrameNumbers("heart"),
      frameRate: 5,
      repeat: -1
    });

    this.hearts = this.physics.add.group({
      key: "heart",
      repeat: 10
    });

    for (let i = 0; i < this.hearts.children.size; i++) {
      this.hearts.children.entries[i].setBounce(0.2);
      this.hearts.children.entries[i].setGravityY(100);
      this.hearts.children.entries[i].setCollideWorldBounds(true);
      this.hearts.children.entries[i].anims.play("glimmer");
      this.hearts.children.entries[i].setPosition(200 * i, 10);
    }

    this.physics.add.collider(this.hearts, this.layer);
    this.physics.add.overlap(this.dude, this.hearts, this.collectHearts, null, this);

    this.controls = this.input.keyboard.addKeys({
      "up": Phaser.Input.Keyboard.KeyCodes.UP,
      "left": Phaser.Input.Keyboard.KeyCodes.LEFT,
      "right": Phaser.Input.Keyboard.KeyCodes.RIGHT,
      "music": Phaser.Input.Keyboard.KeyCodes.M,
      "debug": Phaser.Input.Keyboard.KeyCodes.D,
      "back": Phaser.Input.Keyboard.KeyCodes.BACKSPACE
    });

    this.cameras.main.startFollow(this.dude);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.play_music = 0;
    this.background_music = this.sound.add("background_music", { loop: true });

    this.heart_points = 0;
    this.statusText = this.add.text(560, 16, 'Hearts: 0',
                                    { fontSize: '32px', fill: '#ffffff' });
  }

  update(time, delta) {

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

    if (this.controls.music.isDown && (time - this.play_music > 1000)) {
      if (this.background_music.isPlaying) {
        this.background_music.stop();
      } else {
        this.background_music.play();
      }
      this.play_music = time;
    }

    if (this.controls.debug.isDown) {
      if (!this.debugGraphics) {
        this.debugGraphics = this.add.graphics().setAlpha(0.75);
        this.layer.renderDebug(this.debugGraphics, {
          tileColor: null, // Color of non-colliding tiles
          collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
          faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
      } else {
        this.debugGraphics.destroy();
      }
    }

    if (this.controls.back.isDown) {
      this.scene.start("SelectLevel");
    }
  }

  collectHearts(dude, heart) {
    heart.disableBody(true, true);
    this.heart_points += 10;
    this.statusText.setText('Hearts: ' + this.heart_points);
  }
}
