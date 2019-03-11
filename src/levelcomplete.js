export default class LevelComplete extends Phaser.Scene {
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
