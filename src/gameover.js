export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.gameOver = this.add.sprite(this.scale.width / 2, this.scale.height / 2, "gameOver");
    this.gameOver.setScale(0.2);
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
