import gameData from "./gamedata.js";

export default class StatusDisplay extends Phaser.Scene {
  constructor() {
    super("StatusDisplay");
  }

  create() {
    this.healthStatus = this.add.sprite(100, 30, "healthStatus");
    this.healthStatus.setScale(1.8);
    this.gems = [];
  }

  setHealthPoints() {
    this.healthStatus.setCrop(0, 0,
                              this.healthStatus.width * gameData.healthPoints / 100,
                              this.healthStatus.height);
  }

  setGemPoints() {
    let newGem = this.add.sprite(36 + this.gems.length * 32, 70, "gems");
    newGem.setScale(1.8);
    this.gems.push(newGem);
  }
}
