import {Screen} from '../screen_system';
import MapScreen from './map_screen';

export default class TitleScreen extends Screen{
	constructor(){
		super();
		this.header = document.querySelector('.header_template').content.querySelector('.header').cloneNode(true);
		this.content = document.querySelector('.template').content.querySelector('.introScreen').cloneNode(true);
		this.buttons = this.content.querySelectorAll('.buttons');

		this.display = [];

		this.display.push(this.header);
		this.display.push(this.content);

	}

	//var ca = Array.prototype.slice.call(document.querySelectorAll(".classA")).concat(Array.prototype.slice.call(document.querySelectorAll(".classB")));

	enter(exitCallback){

		this.exitCallback = exitCallback;
		for (var button of this.buttons) {
			button.addEventListener('click', this.navigate.bind(this, button));
		}
	}

	navigate(btn){
		let name = btn.className.replace(" buttons", "");

    switch (name) {
      case "playButton":
        this.exitCallback(new MapScreen());
        break;
      case "exit":
        this.exitCallback(new TitleScreen());
        break;
      default:

    }
	}

}
