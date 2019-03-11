export default class SplashScreen extends Phaser.Scene {
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
    this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 24, frameHeight: 32 });
    this.load.spritesheet("heart", "assets/heart.png", { frameWidth: 10, frameHeight: 10 });
    this.load.spritesheet("lava", "assets/lava.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("tiles", "assets/tiles.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("torch", "assets/animated_torch_small.png", { frameWidth: 16, frameHeight: 32 });
    this.load.spritesheet("gems", "assets/jewel_green_animation.png", { frameWidth: 16, frameHeight: 16 });
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
