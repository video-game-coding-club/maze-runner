import gameData from "./gamedata.js";

export default class SelectLevel extends Phaser.Scene {
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
