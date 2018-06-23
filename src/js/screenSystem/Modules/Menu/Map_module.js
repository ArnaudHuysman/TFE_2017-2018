import {Module} from '../Module'
import {MapScene} from '../../../Screen_Scenes/Hero_Choice-Screen/index'
import GameScreen from '../../Screens/game_screen'

export default class MapModule extends Module {
  constructor(screen, map){
    super()

    this.screen = screen;
    this.map = map;
    console.log(this.map)
    this.display = document.querySelector('.module_template').content.querySelector('.map_module').cloneNode(true);
    this.buttons = this.display.querySelectorAll('.button');
  }

  enter(callback){
    this.callback = callback;

    this.display.style.transform = "scale(0.1)";

    TweenMax.to(this.display.style, 0.8, {
      transform : "scale(1)",
      ease: Elastic.easeOut.config(1, 0.5),
      // onComplete : this.callback.bind(this, this.display)
    })

    this.display.querySelector('.textblock--title').innerText = this.map.name;
    this.display.querySelector('.wave-nbr').innerText = this.map.waves.length;
    this.display.querySelector('.wave-diff').innerText = this.map.difficulty;

    let mapSceneCtx = this.display.querySelector('.description_img');

    let showreel = new MapScene(mapSceneCtx, this.map);
    showreel.init();

    for (var button of this.buttons) {
			button.addEventListener('click', this.navigate.bind(this, button));
		}
  }

  navigate(btn){
		let name = btn.className.replace(" button", "");

    switch (name) {
      case "textblock--btn":
        this.screen.app.audioRessource.play("btn", false, 1, 1);
        this.screen.app.mapSelected = 	JSON.parse(JSON.stringify(this.map));
        this.screen.exitCallback(new GameScreen(this.screen.app));
        this.callback(this.display);
        break;

      case "exit-btn":
        this.callback(this.display);
        break;

    }
	}

}
