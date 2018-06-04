import {Screen} from '../screen_system';



import {StandartHero} from '../../Game/Heroes/hero_class';
import {Game} from '../../Game/game';
import {scene} from '../../Game/Scene/Scene';
import {maps} from '../../Game/Maps/maps_object'


var game;

export default class GameScreen extends Screen{
	constructor(){
		super();
		this.content = document.querySelector('.template').content.querySelector('.gameScreen').cloneNode(true);

		this.display = [];
		this.display.push(this.content);
	}

	enter(exitCallback){
		game = new Game(maps.firstMap, scene);
		window.game = game;
		game.init(scene);

		this.exitCallback = exitCallback;
	}
}
