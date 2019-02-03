const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade"
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
};

function create() {
  let level = [];
  for (let i = 0; i < 60; i++) {
    level[i] = [];
    for (let j = 0; j < 60; j++) {
      level[i][j] = Math.floor(Math.random() * 23) - 1;
    }
  }

  const map = this.make.tilemap({
    data: level,
    tileWidth: 32,
    tileHeight: 32
  });

  const tiles = map.addTilesetImage("tiles");
  const layer = map.createStaticLayer(0, tiles, 0, 0);

  const camera = this.cameras.main;

  const cursors = this.input.keyboard.createCursorKeys();
  controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: camera,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    speed: 0.5
  });

  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  this.add
    .text(16, 16, "Arrow keys to scroll", {
      font: "18px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
      backgroundColor: "#000000"
    })
    .setScrollFactor(0);
};

function update(time, delta) {
  controls.update(delta);
};

function render() {
};
