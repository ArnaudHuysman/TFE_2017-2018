import {Screen} from '../screen_system';
import GameScreen from './game_screen';
import {Heroes} from '../../Game/Utils/utils';

export default class ChoiceScreen extends Screen{
	constructor(){
		super();
		this.display = document.querySelector('.template').content.querySelector('.characterScreen').cloneNode(true);
		this.button = this.display.querySelector('.playButton');

	}

	enter(exitCallback){

		this.exitCallback = exitCallback;
	  this.button.addEventListener('click', this.navigate.bind(this));
	}

	navigate(e){
		this.exitCallback(new GameScreen());
	}
}
