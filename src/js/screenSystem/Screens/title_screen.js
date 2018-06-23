import {Screen} from '../screen_system';
import MapScreen from './map_screen';

import Images from '../../img_load';

export default class TitleScreen extends Screen{
	constructor(app){
		super(app);
		this.content = document.querySelector('.template').content.querySelector('.introScreen').cloneNode(true);
		this.buttons = this.content.querySelectorAll('.buttons');

		this.display = [];

		this.display.push(this.header);
		this.display.push(this.content);
		this.images = Images;
	}

	//var ca = Array.prototype.slice.call(document.querySelectorAll(".classA")).concat(Array.prototype.slice.call(document.querySelectorAll(".classB")));

	enter(exitCallback){

		super.enter()
		this.exitCallback = exitCallback;

		for (var button of this.buttons) {
			button.addEventListener('click', this.navigate.bind(this, button));
		}
	}

	update(dt){

	}

	navigate(btn){
		super.navigate()
		let name = btn.className.replace(" buttons", "");

    switch (name) {
      case "playButton":
        this.exitCallback(new MapScreen(this.app));
        break;
      default:

    }
	}

}
