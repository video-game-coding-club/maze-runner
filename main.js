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
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  audio: {
    disableWebAudio: true
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("tiles", "assets/tiles.png");
  //this.load.tilemapTiledJSON("map", "assets/map.json");
  //this.load.tilemapCSV("map", "assets/Maze Runner Levels - Level 1.csv");
  this.load.tilemapCSV("map", "assets/Lucas.csv");
  this.load.spritesheet("dude", "assets/dude.png",
                        { frameWidth: 32,
                          frameHeight: 32
                        });
  this.load.spritesheet("heart", "assets/heart.png",
                        { frameWidth: 10,
                          frameHeight: 10
                        });
  this.load.audio("background_music",
                  "assets/Ove - Earth Is All We Have .ogg");
};

function create() {
  /* Create the map. */
  this.map = this.make.tilemap({
    key: "map",
    tileWidth: 32,
    tileHeight: 32
  });
  this.tiles = this.map.addTilesetImage("tiles");
  this.layer = this.map.createStaticLayer(0, this.tiles);
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
    frames: [ { key: "dude", frame: 7 } ]
  });

  this.anims.create({
    key: "jump",
    frames: [ { key: "dude", frame: 4 } ]
  });

  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 6 }),
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
  this.physics.add.overlap(this.dude, this.hearts, collectHearts, null, this);

  this.controls = this.input.keyboard.addKeys({
    "up": Phaser.Input.Keyboard.KeyCodes.UP,
    "left": Phaser.Input.Keyboard.KeyCodes.LEFT,
    "right": Phaser.Input.Keyboard.KeyCodes.RIGHT,
    "music": Phaser.Input.Keyboard.KeyCodes.M,
    "debug": Phaser.Input.Keyboard.KeyCodes.D
  });

  this.cameras.main.startFollow(this.dude);
  this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

  this.play_music = 0;
  this.background_music = this.sound.add("background_music", { loop: true });

  this.heart_points = 0;
  this.statusText = this.add.text(560, 16, 'Hearts: 0',
                                  { fontSize: '32px', fill: '#ffffff' });
};

function update(time, delta) {

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
};

function collectHearts(dude, heart) {
  heart.disableBody(true, true);
  this.heart_points += 10;
  this.statusText.setText('Hearts: ' + this.heart_points);
};
