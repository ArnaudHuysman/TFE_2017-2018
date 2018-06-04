import {Screen} from '../screen_system';
import TitleScreen from './title_screen';
import ChoiceScreen from './choice_screen'

import MenuModule from '../Modules/Game/menu_module';
export default class MapScreen extends Screen{
	constructor(){
		super();
		this.header = document.querySelector('.header_template').content.querySelector('.header').cloneNode(true);
		this.content = document.querySelector('.template').content.querySelector('.mapScreen').cloneNode(true);

		this.buttons = Array.prototype.slice.call(this.content.querySelectorAll(".buttons")).concat(Array.prototype.slice.call(this.header.querySelectorAll(".buttons")));


		this.display = [];
		this.display.push(this.header);
		this.display.push(this.content);

	}

	enter(exitCallback){

		let maps = this.content.querySelectorAll('.map');

		console.log(maps);
		this.exitCallback = exitCallback;

    for (var button of this.buttons) {
      console.log(button)
      button.addEventListener('click', this.navigate.bind(this, button));
    }
	  //this.button.addEventListener('click', this.navigate.bind(this));
	}

	navigate(btn){


    let name = btn.className.replace(" buttons", "");

    switch (name) {
      case "char_choice":
        this.exitCallback(new ChoiceScreen());
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
}
