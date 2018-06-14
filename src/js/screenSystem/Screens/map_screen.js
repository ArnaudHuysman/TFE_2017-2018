import {Screen} from '../screen_system';
import TitleScreen from './title_screen';
import ChoiceScreen from './choice_screen'
import GameScreen from './game_screen'

import MenuModule from '../Modules/Game/menu_module';
export default class MapScreen extends Screen{
	constructor(){
		super();
		this.header = document.querySelector('.header_template').content.querySelector('.header').cloneNode(true);
		this.content = document.querySelector('.template').content.querySelector('.mapScreen').cloneNode(true);

		this.buttons = Array.prototype.slice.call(this.content.querySelectorAll(".buttons")).concat(Array.prototype.slice.call(this.header.querySelectorAll(".buttons")));

		this.maps = this.content.querySelectorAll('.map');

		console.log(this.maps);

		this.display = [];
		this.display.push(this.header);
		this.display.push(this.content);

		this.images = [];

	}

	enter(exitCallback){

		this.exitCallback = exitCallback;


    for (let button of this.buttons) {
      button.addEventListener('click', this.navigate.bind(this, button), true);
    }

		this.content.addEventListener('click', this.toggleMaps.bind(this), true);

		for (let map of this.maps) {
			map.addEventListener('click', this.toggleMaps.bind(this, map), true);
			// let desc  = map.querySelector('.description');
			// let btn  = desc.querySelector('.textblock--btn');
			// btn.addEventListener('click', this.navigate.bind(this, btn));
		}

	}

	navigate(btn){
    let name = btn.className.replace(" buttons", "");

    switch (name) {
      case "textblock--btn":
        this.exitCallback(new GameScreen(btn.dataset.name));
        break;
      case "exit":
        this.exitCallback(new TitleScreen());
        break;
			case "option":
				this.moduleSystem.setModule(new MenuModule());
				break;
      default:

    }
	}

	toggleMaps(currentMap){
		console.log("toggle");

		for (let map of this.maps) {
			if(map.querySelector('.description').style.display === "block") map.querySelector('.description').style.display = "none";
		}

		if(!(currentMap instanceof MouseEvent )){
			let map  = currentMap.querySelector('.description');
			map.style.display = "block";
		}
	}

}
