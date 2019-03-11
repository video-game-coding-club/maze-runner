import gameData from "./gamedata.js";
import SplashScreen from "./splashscreen.js";
import Credits from "./credits.js";
import SelectLevel from "./selectlevel.js";
import PlayLevel from "./playlevel.js";
import StatusDisplay from "./statusdisplay.js";
import LevelComplete from "./levelcomplete.js";
import GameOver from "./gameover.js";

window.onload = function() {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
      mode: Phaser.Scale.RESIZE
    },
    physics: {
      default: "arcade",
      acrcade: {
        debug: true,
        gravity: {
          y: 300
        }
      }
    },
    scene: [
      SplashScreen,
      Credits,
      SelectLevel,
      PlayLevel,
      StatusDisplay,
      GameOver,
      LevelComplete
    ],
    audio: {
      disableWebAudio: true
    }
  };

  const game = new Phaser.Game(config);
};
