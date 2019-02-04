const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    acrcade: {
      gravity: {
        y: 300
      }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
    render: render
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("tiles", "assets/tiles.png");
  this.load.spritesheet("dude", "assets/dude.png",
                        { frameWidth: 32,
                          frameHeight: 32
                        });
};

function create() {
  /* Create empty tile map. */
  let level = [];
  for (let i = 0; i < 30; i++) {
    level[i] = [];
    for (let j = 0; j < 30; j++) {
      level[i][j] = -1;
    }
  }

  /* Create the level layout. */
  level[3].fill(5, 0, 10);

  this.map = this.make.tilemap({
    data: level,
    tileWidth: 32,
    tileHeight: 32
  });

  const tiles = this.map.addTilesetImage("tiles");
  this.layer = this.map.createStaticLayer(0, tiles, 0, 0);
  this.map.setCollisionBetween(0, 22, this.layer);

  this.dude = this.physics.add.sprite(10, 10, "dude");
  this.dude.setBounce(0.2);
  this.dude.setGravityY(300);

  this.cursors = this.input.keyboard.createCursorKeys();
};

function update(time, delta) {
  this.physics.collide(this.dude, this.layer);

  if (this.cursors.right.isDown) {
    this.dude.setVelocityX(100);
  } else if (this.cursors.left.isDown) {
    this.dude.setVelocityX(-100);
  } else {
    this.dude.setVelocityX(0);
  }

  if (this.cursors.up.isDown) {
    this.dude.setVelocityY(-100);
  }
};

function render() {
};
