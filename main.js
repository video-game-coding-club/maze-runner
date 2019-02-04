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

  /* Class: Tilemap

     Phaser.Tilemaps. Tilemap

     A Tilemap is a container for Tilemap data. This isn't a display
     object, rather, it holds data about the map and allows you to add
     tilesets and tilemap layers to it. A map can have one or more
     tilemap layers (StaticTilemapLayer or DynamicTilemapLayer), which
     are the display objects that actually render tiles.

     The Tilemap data be parsed from a Tiled JSON file, a CSV file or
     a 2D array. Tiled is a free software package specifically for
     creating tile maps, and is available from:
     http://www.mapeditor.org

     A Tilemap has handy methods for getting & manipulating the tiles
     within a layer. You can only use the methods that change tiles
     (e.g. removeTileAt) on a DynamicTilemapLayer.

     Note that all Tilemaps use a base tile size to calculate
     dimensions from, but that a StaticTilemapLayer or
     DynamicTilemapLayer may have its own unique tile size that
     overrides it.
  */
  this.map = this.make.tilemap({
    data: level
  });

  /* addTilesetImage(tilesetName [, key] [, tileWidth] [, tileHeight] [, tileMargin] [, tileSpacing] [, gid])

     Adds an image to the map to be used as a tileset. A single map
     may use multiple tilesets. Note that the tileset name can be
     found in the JSON file exported from Tiled, or in the Tiled
     editor.

  */
  this.tiles = this.map.addTilesetImage("tiles", null, 32, 32, 0, 0);

  /* createStaticLayer(layerID, tileset, x, y)

     Creates a new StaticTilemapLayer that renders the LayerData
     associated with the given layerID. The currently selected layer
     in the map is set to this new layer.

     The layerID is important. If you've created your map in Tiled
     then you can get this by looking in Tiled and looking at the
     layer name. Or you can open the JSON file it exports and look at
     the layers[].name value. Either way it must match.

     It's important to remember that a static layer cannot be
     modified. See StaticTilemapLayer for more information.
*/
  this.layer = this.map.createStaticLayer(0, this.tiles, 0, 0);

  /* setCollisionBetween(start, stop [, collides] [, recalculateFaces] [, layer])

     Sets collision on a range of tiles in a layer whose index is
     between the specified start and stop (inclusive). Calling this
     with a start value of 10 and a stop value of 14 would set
     collision for tiles 10, 11, 12, 13 and 14. The collides parameter
     controls if collision will be enabled (true) or disabled (false).

     If no layer specified, the map's current layer is used.
  */
  this.map.setCollisionBetween(0, 22, this.layer);

  /* sprite(x, y, key [, frame])

     Creates a new Arcade Sprite object with a Dynamic body.
  */
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
