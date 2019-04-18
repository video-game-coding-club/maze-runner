/* global Phaser */

const gameData = {
  level: -1,
  gameOver: false,
  healthPoints: 100,
  gemPoints: 0,
};

class SplashScreen extends Phaser.Scene {
  constructor() {
    super("SplashScreen");
  }

  progressBar() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", function(value) {
      console.warn(value);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
      percentText.setText(parseInt(value * 100) + "%");
    });

    this.load.on("fileprogress", function(file) {
      console.warn(file.src);
      assetText.setText("Loading asset: " + file.key);
    });

    this.load.on("complete", function() {
      console.warn("complete");
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
    this.load.spritesheet("dude", "assets/spritesheets/elf girl idle.png", {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet("heart", "assets/spritesheets/heart.png", {frameWidth: 11, frameHeight: 10});
    this.load.spritesheet("lava", "assets/spritesheets/lava.png", {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet("tiles", "assets/tiles.png", {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet("torch", "assets/spritesheets/animated_torch_small.png", {frameWidth: 16, frameHeight: 32});
    this.load.spritesheet("gems", "assets/spritesheets/jewel_green_animation.png", {frameWidth: 16, frameHeight: 16});
    this.load.tilemapTiledJSON("map_0", "assets/maps/map-level-0.json");
    this.load.tilemapTiledJSON("map_1", "assets/maps/map-level-1.json");
    this.load.tilemapTiledJSON("map_2", "assets/maps/map-level-2.json");
    this.load.tilemapTiledJSON("map_3", "assets/maps/map-level-3.json");
    this.load.tilemapTiledJSON("map_4", "assets/maps/map-level-4.json");
  }

  create() {
    this.add.sprite(this.scale.width / 2, this.scale.height / 2, "splash");
    this.input.keyboard.on("keydown", () => {
      this.scene.start("SelectLevel");
    });
    this.messageShown = false;
  }

  update(time) {
    if (time > 2000 && !this.messageShown) {
      const message = this.make.text({
        x: this.cameras.main.width / 2,
        y: 100,
        text: "Press any key to start the game",
        style: {
          font: "30px monospace",
          fill: "#ffffff",
        },
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
    const creditOffsetX = 340;
    let creditOffsetY = 0;
    const titleStyle = {
      fontSize: "64px",
      fill: "#ffffff",
      stroke: "#202020",
    };
    const headerStyle = {
      fontSize: "48px",
      fill: "#ffffff",
      stroke: "#202020",
    };
    const paragraphStyle = {
      fontSize: "24px",
      fill: "#ffffff",
      stroke: "#202020",
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
    const button = [];
    const buttonText = [];
    for (let i = 0; i < 5; i++) {
      button[i] = this.add.sprite(150, 60 + i * 80, "button");
      button[i].setScale(0.3, 0.15);
      buttonText[i] = this.add.text(80, 40 + i * 80, "Level " + i,
          {
            fontSize: "32px",
            fill: "#ffffff",
            stroke: "#202020",
            strokeThickness: 3,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            shadowBlur: 2,
            shadowColor: "#101010",
          });
    }
    this.levelControls = this.input.keyboard.addKeys({
      "zero": Phaser.Input.Keyboard.KeyCodes.ZERO,
      "one": Phaser.Input.Keyboard.KeyCodes.ONE,
      "two": Phaser.Input.Keyboard.KeyCodes.TWO,
      "three": Phaser.Input.Keyboard.KeyCodes.THREE,
      "four": Phaser.Input.Keyboard.KeyCodes.FOUR,
    });

    this.sound.stopAll();
    const backgroundMusic = this.sound.add("title_music", {loop: true});
    backgroundMusic.play();

    this.scene.launch("Credits");
  }

  playLevel(level) {
    gameData.level = level;
    gameData.gameOver = false;
    gameData.healthPoints = 100;
    gameData.gemPoints = 0;
    this.scene.stop("Credits");
    this.scene.start("PlayLevel");
  }

  update() {
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

  createAnimations() {
    /* Create Dude animations. */
    this.anims.create({
      key: "dude_idle",
      frames: [{key: "dude", frame: 0}],
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "dude_run",
      frames: [{key: "dude", frame: 0}],
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "dude_jump",
      frames: [{key: "dude", frame: 0}],
      frameRate: 20,
      repeat: -1,
    });

    /* Create the heart animation. */
    this.anims.create({
      key: "glimmer",
      frames: this.anims.generateFrameNumbers("heart"),
      frameRate: 5,
      repeat: -1,
    });

    /* Create torches. */
    this.anims.create({
      key: "flicker",
      frames: this.anims.generateFrameNumbers("torch"),
      frameRate: 4,
      repeat: -1,
    });

    /* Create gems (green). */
    this.anims.create({
      key: "gem_glimmer",
      frames: this.anims.generateFrameNumbers("gems"),
      frameRate: 5,
      repeat: -1,
    });

    /* Create lava animation. */
    this.anims.create({
      key: "lava",
      frames: this.anims.generateFrameNumbers("lava"),
      frameRate: 1,
      repeat: -1,
    });

    /* Create the door states. */
    this.anims.create({
      key: "exit_closed",
      frames: [{key: "tiles", frame: 18}],
    });
    this.anims.create({
      key: "exit_open",
      frames: [{key: "tiles", frame: 19}],
    });
  }

  createDude() {
    /* Add the dude.
     *
     * I tried to use `createFromObjects()` here and then
     * `this.physics.add.existing()` but that didn't quite work. We
     * should revisit this issue at some later time.
     */
    const dudeObject = this.map.findObject("objects", (o) => {
      return o.name === "dude";
    });
    let dudePosition = {x: 10, y: 10};
    if (dudeObject) {
      dudePosition = {x: dudeObject.x, y: dudeObject.y};
    }
    this.dude = this.physics.add.sprite(dudePosition.x, dudePosition.y, "dude_idle");
    this.dude.setBounce(0.2);
    this.dude.setGravityY(300);
    this.dude.setCollideWorldBounds(true);
    this.dude.anims.play("dude_idle");
    this.dude.setScale(0.5);
  }

  createLooseTiles(backgroundTiles) {
    const looseLayer = this.map.createStaticLayer("loose", backgroundTiles);
    this.looseTiles = this.physics.add.group();
    looseLayer.forEachTile((tile) => {
      if (tile.properties.type === "rock") {
        const newTile = this.physics.add.sprite(tile.getCenterX(), tile.getCenterY(), "tiles", tile.index - 1);
        this.looseTiles.add(newTile);
        newTile.setImmovable(true);
        newTile.setCollideWorldBounds(true);
      }
    });
    looseLayer.destroy();
  }

  createLavaTiles(gameLayer) {
    this.lavaTiles = this.physics.add.staticGroup();
    gameLayer.forEachTile((tile) => {
      if (tile.properties.type === "lava") {
        const lava = this.lavaTiles.create(tile.getCenterX(), tile.getCenterY(), "lava");
        lava.anims.play("lava");
        gameLayer.removeTileAt(tile.x, tile.y);
      }
    });
  }

  createExits(gameLayer) {
    this.exitTiles = this.physics.add.staticGroup();
    gameLayer.forEachTile((tile) => {
      if (tile.properties.type === "exit") {
        const exit = this.exitTiles.create(tile.getCenterX(), tile.getCenterY(), "tiles");
        exit.anims.play("exit_closed");
        gameLayer.removeTileAt(tile.x, tile.y);
      }
    });
  }

  createHearts() {
    const hearts = this.map.createFromObjects("objects", "heart", {key: "heart"});
    if (hearts) {
      hearts.forEach((heart) => {
        this.physics.add.existing(heart);
        heart.anims.play("glimmer");
      });
    }
    return hearts;
  }

  createGems() {
    this.gems = this.map.createFromObjects("objects", "gems", {key: "gems"});
    if (this.gems) {
      this.gems.forEach((gem) => {
        this.physics.add.existing(gem);
        gem.anims.play("gem_glimmer");
      });
    }
  }

  createTorches() {
    this.torches = this.map.createFromObjects("objects", "torch", {key: "torch"});
    if (this.torches) {
      this.torches.forEach((torch) => {
        this.physics.add.existing(torch);
        torch.anims.play("flicker");
      });
    }
  }

  createColliders(gameLayer, hearts) {
    /* Create the colliders.
     *
     * Also check whether the dude jumped from really high. Note that
     * the order of colliders matters. We need to add this one first
     * so that we can check for on the tiles. If we add it after the
     * normal game physics collider, the dude will have been separated
     * from the gameLayer already before we check for impact. */
    this.physics.add.collider(this.dude, gameLayer, this.dudeHitTheFloor);
    this.physics.add.collider(this.dude, gameLayer);
    this.physics.add.overlap(this.dude, this.looseTiles, this.overlapLooseTiles, null, this);
    this.physics.add.collider(this.dude, this.looseTiles);
    this.physics.add.overlap(this.dude, hearts, this.collectHearts, null, this);
    this.physics.add.overlap(this.dude, this.gems, this.collectGems, null, this);
  }

  createControls() {
    this.controls = this.input.keyboard.addKeys({
      "up": Phaser.Input.Keyboard.KeyCodes.UP,
      "left": Phaser.Input.Keyboard.KeyCodes.LEFT,
      "right": Phaser.Input.Keyboard.KeyCodes.RIGHT,
      "back": Phaser.Input.Keyboard.KeyCodes.BACKSPACE,
    });
  }

  setupCamera() {
    this.cameras.main.startFollow(this.dude);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setZoom(2);
  }

  setupSound() {
    this.sound.stopAll();
    this.backgroundMusic = this.sound.add("background_music", {loop: true});
    this.backgroundMusic.play();
    this.heartSoundEffect = this.sound.add("coin");
  }

  create() {
    /* Create the map. */
    this.map = this.make.tilemap({
      key: "map_" + gameData.level,
      tileWidth: 32,
      tileHeight: 32,
    });
    /* Resize world to fit the level. */
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    /* Create tileset for background. */
    const backgroundTiles = this.map.addTilesetImage("tiles");

    /* Create background layer. */
    this.map.createStaticLayer("background", backgroundTiles);

    /* Create the game layer. */
    const gameLayer = this.map.createDynamicLayer("game", backgroundTiles);

    /* Create the animations. */
    this.createAnimations();

    /* Create the torches. We create the torches before we create the
     * dude so that the dude appears in front of the torches. */
    this.createTorches();

    /* Create and place the dude. */
    this.createDude();

    /* Create foreground layer. We need to create this layer _after_
     * we add the dude sprite so that the dude is hidden by this
     * layer. */
    this.map.createStaticLayer("foreground", backgroundTiles);

    /* Create the loose tiles. */
    this.createLooseTiles(backgroundTiles);

    /* Create the lava. */
    this.createLavaTiles(gameLayer);

    /* Find exits. */
    this.createExits(gameLayer);

    /* Create the hearts. */
    const hearts = this.createHearts();

    /* Create the gems. */
    this.createGems();

    /* Turn on collision detection for the gameLayer. */
    gameLayer.setCollisionByProperty({collides: true});

    /* Create the colliders. */
    this.createColliders(gameLayer, hearts);

    /* Add keyboard controls. */
    this.createControls();

    /* Set up the camera. */
    this.setupCamera();

    /* Setup the sound. */
    this.setupSound();

    /* Launch the status display. */
    this.scene.launch("StatusDisplay");

    gameData.gameOver = false;
    gameData.levelComplete = false;
  }

  update(time) {
    if (gameData.levelComplete) {
      this.dude.anims.play("dude_idle");
      return;
    }

    if (this.controls.back.isDown) {
      this.scene.stop("StatusDisplay");
      this.scene.start("SelectLevel");
    }

    if (this.controls.right.isDown) {
      this.dude.setFlipX(false);
      this.dude.setVelocityX(100);
      this.dude.anims.play("dude_run", true);
    } else if (this.controls.left.isDown) {
      this.dude.setFlipX(true);
      this.dude.setVelocityX(-100);
      this.dude.anims.play("dude_run", true);
    } else {
      /* Stop any previous movement. */
      this.dude.setVelocityX(0);
      this.dude.anims.play("dude_idle");
    }

    if (this.controls.up.isDown) {
      /* Climb or jump. */
      if (this.dude.body.onFloor() || this.dude.body.onFloorOfLooseTile) {
        /* Jump. */
        this.dude.setVelocityY(-130);
      } else if (this.dude.body.onWall() || this.dude.body.onWallOfLooseTile) {
        /* Climb. */
        this.dude.setVelocityY(-50);
      }
    }

    /* When the dude is in the air, play the 'jump' animation. */
    if (!(this.dude.body.onFloor() || this.dude.body.onWall() || this.dude.body.onWallOfLooseTile)) {
      this.dude.anims.play("dude_jump");
    }

    /* Check whether the dude fell into lava. */
    if (this.physics.world.overlap(this.dude, this.lavaTiles)) {
      console.warn("The dude in lava");
      if (this.fellInLava === undefined || this.fellInLava === null) {
        this.fellInLava = time;
        gameData.healthPoints -= 20;
      } else {
        if (time - this.fellInLava > 2000) {
          gameData.healthPoints -= 20;
          this.fellInLava = time;
        }
      }
    } else {
      this.fellInLava = null;
    }

    /* Check whether the Dude is leaving. */
    this.exitTiles.getChildren().forEach((exit) => {
      if (this.physics.world.overlap(this.dude, exit)) {
        this.dudeIsLeaving(this.dude, exit);
      }
    });

    /* Update health points display. */
    if (gameData.healthPoints <= 0) {
      gameData.gameOver = true;
      this.scene.stop("StatusDisplay");
      this.scene.start("GameOver");
    } else {
      this.scene.get("StatusDisplay").setHealthPoints();
    }
    this.scene.get("StatusDisplay").setGemPoints();

    /* Reset dude overlap. */
    this.dude.body.onWallOfLooseTile = false;
    this.dude.body.onFloorOfLooseTile = false;
  }

  overlapLooseTiles(dude, looseTile) {
    if (Math.abs(dude.body.overlapX) > 0) {
      dude.body.onWallOfLooseTile = true;
    } else if (Math.abs(dude.body.overlapY) > 0) {
      dude.body.onFloorOfLooseTile = true;
      if (looseTile.state !== "triggered") {
        looseTile.state = "triggered";
        this.time.addEvent({
          delay: 500,
          callback: () => {
            looseTile.setGravityY(500);
          },
        });
      }
    }
  }

  collectHearts(dude, heart) {
    heart.destroy();
    gameData.healthPoints += 20;
    gameData.healthPoints = Math.min(100, gameData.healthPoints);
    this.heartSoundEffect.play();
  }

  collectGems(dude, gem) {
    gem.destroy();
    gameData.gemPoints += 1;
  }

  dudeHitTheFloor(dude) {
    if (dude.body.onFloor() && Math.abs(dude.body.velocity.y) > 40) {
      console.warn("high velocity impact (" + dude.body.velocity.y + ")");
      gameData.healthPoints -= (Math.abs(dude.body.velocity.y) - 40) * 1.5;
    }
  }

  dudeIsLeaving(dude, exit) {
    if (gameData.levelComplete) {
      return;
    }

    gameData.levelComplete = true;
    console.warn("The dude is leaving");
    exit.anims.play("exit_open");
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
    this.gems = [];
  }

  setHealthPoints() {
    this.healthStatus.setCrop(0, 0,
        this.healthStatus.width * gameData.healthPoints / 100,
        this.healthStatus.height);
  }

  setGemPoints() {
    if (gameData.gemPoints > this.gems.length) {
      const newGem = this.add.sprite(36 + this.gems.length * 32, 70, "gems");
      newGem.setScale(1.8);
      this.gems.push(newGem);
    }
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
      "back": Phaser.Input.Keyboard.KeyCodes.BACKSPACE,
    });
  }

  update() {
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
    const gameOver = this.add.sprite(this.scale.width / 2, this.scale.height / 2, "gameOver");
    gameOver.setScale(0.2);
    this.controls = this.input.keyboard.addKeys({
      "back": Phaser.Input.Keyboard.KeyCodes.BACKSPACE,
    });
  }

  update() {
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
      mode: Phaser.Scale.RESIZE,
    },
    physics: {
      default: "arcade",
      acrcade: {
        debug: true,
        gravity: {
          y: 300,
        },
      },
    },
    scene: [
      SplashScreen,
      Credits,
      SelectLevel,
      PlayLevel,
      StatusDisplay,
      GameOver,
      LevelComplete,
    ],
    audio: {
      disableWebAudio: true,
    },
  };

  const game = new Phaser.Game(config);
  console.warn("Created new game " + game);
};
