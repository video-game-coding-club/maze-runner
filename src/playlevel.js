import gameData from "./gamedata.js";

export default class PlayLevel extends Phaser.Scene {
  constructor() {
    super("PlayLevel");
  }

  createAnimations() {
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

    /* Create gems (green). */
    this.anims.create({
      key: "gem_glimmer",
      frames: this.anims.generateFrameNumbers("gems"),
      frameRate: 5,
      repeat: -1
    });

    /* Create lava animation. */
    this.anims.create({
      key: "lava",
      frames: this.anims.generateFrameNumbers("lava"),
      frameRate: 1,
      repeat: -1
    });

    /* Create the door states. */
    this.anims.create({
      key: "exit_closed",
      frames: [ { key: "tiles", frame: 18 } ]
    });
    this.anims.create({
      key: "exit_open",
      frames: [ { key: "tiles", frame: 19 } ]
    });
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

    /* Create background layer. */
    this.backgroundLayer = this.map.createStaticLayer("background", this.backgroundTiles);

    /* Create the game layer. */
    this.gameLayer = this.map.createDynamicLayer("game", this.backgroundTiles);

    this.createAnimations();

    /* Add the dude.
     *
     * I tried to use `createFromObjects()` here and then
     * `this.physics.add.existing()` but that didn't quite work. We
     * should revisit this issue at some later time.
     */
    let dudeObject = this.map.findObject("objects", o => {
      return o.name === "dude";
    });
    let dudePosition = { x: 10, y: 10 };
    if (dudeObject) {
      dudePosition = { x: dudeObject.x, y: dudeObject.y };
    }
    this.dude = this.physics.add.sprite(dudePosition.x, dudePosition.y, "dude");
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

    /* Create the lava. */
    this.lavaTiles = this.physics.add.staticGroup();
    this.gameLayer.forEachTile(tile => {
      if (tile.properties.type === "lava") {
        const lava = this.lavaTiles.create(tile.getCenterX(), tile.getCenterY(), "lava");
        lava.anims.play("lava");
        this.gameLayer.removeTileAt(tile.x, tile.y);
      }
    });

    /* Find exits. */
    this.exitTiles = this.physics.add.staticGroup();
    this.gameLayer.forEachTile(tile => {
      if (tile.properties.type === "exit") {
        const exit = this.exitTiles.create(tile.getCenterX(), tile.getCenterY(), "tiles");
        exit.anims.play("exit_closed");
        this.gameLayer.removeTileAt(tile.x, tile.y);
      }
    });

    /* Create the hearts. */
    this.hearts = this.map.createFromObjects("objects", "heart", { key: "heart" });
    if (this.hearts) {
      this.hearts.forEach(heart => {
        this.physics.add.existing(heart);
        heart.anims.play("glimmer");
      });
    }
    this.physics.add.overlap(this.dude, this.hearts, this.collectHearts, null, this);

    /* Create the gems. */
    this.gems = this.map.createFromObjects("objects", "gems", { key: "gems" });
    if (this.gems) {
      this.gems.forEach(gem => {
        this.physics.add.existing(gem);
        gem.anims.play("gem_glimmer");
      });
    }
    this.physics.add.overlap(this.dude, this.gems, this.collectGems, null, this);

    /* Create the torches. */
    this.torches = this.map.createFromObjects("objects", "torch", { key: "torch" });
    if (this.torches) {
      this.torches.forEach(torch => {
        this.physics.add.existing(torch);
        torch.anims.play("flicker");
      });
    }

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
      if (this.fellInLava === undefined || this.fellInLava === null) {
        this.fellInLava = time;
        gameData.healthPoints -= 20;
      } else {
        if (time - this.fellInLava > 2000) {
          gameData.healthPoints -= 20;
          this.fellInLava = time;
        }
      }

      if (gameData.healthPoints <= 0) {
        gameData.gameOver = true;
        this.scene.stop("StatusDisplay");
        this.scene.start("GameOver");
      } else {
        this.scene.get("StatusDisplay").setHealthPoints();
      }
    } else {
      this.fellInLava = null;
    }

    /* Check whether the Dude is leaving. */
    this.exitTiles.getChildren().forEach(exit => {
      if (this.physics.world.overlap(this.dude, exit)) {
        this.dudeIsLeaving(this.dude, exit);
      }});
  }

  collectHearts(dude, heart) {
    heart.destroy();
    gameData.healthPoints += 20;
    gameData.healthPoints = Math.min(100, gameData.healthPoints);
    this.heartSoundEffect.play();
    this.scene.get("StatusDisplay").setHealthPoints();
  }

  collectGems(dude, gem) {
    gem.destroy();
    gameData.gemPoints += 1;
    this.scene.get("StatusDisplay").setGemPoints();
  }

  dudeIsLeaving(dude, exit) {
    if (gameData.levelComplete) {
      return;
    }

    gameData.levelComplete = true;
    console.log("The dude is leaving");
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
