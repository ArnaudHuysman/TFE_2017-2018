import {Screen} from '../screen_system';
import GameScreen from './game_screen';
import TitleScreen from './title_screen';
import {HeroShowreel} from '../../Screen_Scenes/Hero_Choice-Screen/index'

var showreel;
export default class ChoiceScreen extends Screen{
	constructor(){
		super();
		this.header = document.querySelector('.header_template').content.querySelector('.header').cloneNode(true);
		this.content = document.querySelector('.template').content.querySelector('.characterScreen').cloneNode(true);
		this.buttons = this.content.querySelectorAll('.buttons');

		this.display = [];
		this.display.push(this.content);

	}

	enter(exitCallback){

		for (var button of this.buttons) {
			button.addEventListener('click', this.navigate.bind(this, button));
		}

		console.log(HeroShowreel);

		showreel = new HeroShowreel();
		showreel.init();

		this.exitCallback = exitCallback;

	}

	navigate(btn){
		let name = btn.className.replace(" buttons", "");

    switch (name) {
      case "startButton":
        this.exitCallback(new GameScreen());
        break;
      case "exit":
        this.exitCallback(new TitleScreen());
        break;
      default:
    }
	}
}
