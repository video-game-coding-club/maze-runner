export default class Credits extends Phaser.Scene {
  constructor() {
    super("Credits");
  }

  create() {
    let creditOffsetX = 340;
    let creditOffsetY = 0;
    let titleStyle = {
      fontSize: "64px",
      fill: "#ffffff",
      stroke: "#202020"
    };
    let headerStyle = {
      fontSize: "48px",
      fill: "#ffffff",
      stroke: "#202020"
    };
    let paragraphStyle = {
      fontSize: "24px",
      fill: "#ffffff",
      stroke: "#202020"
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
