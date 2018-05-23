import {Screen} from '../screen_system';
import ChoiceScreen from './choice_screen';

export default class TitleScreen extends Screen{
	constructor(){
		super();
		this.display = document.querySelector('.template').content.querySelector('.introScreen').cloneNode(true);
		this.button = this.display.querySelector('.playButton');

	}

	enter(exitCallback){

		this.exitCallback = exitCallback;
	  this.button.addEventListener('click', this.navigate.bind(this));
	}

	navigate(e){
		this.exitCallback(new ChoiceScreen());
	}

}
