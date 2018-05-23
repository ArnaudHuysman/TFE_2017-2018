import {Screen} from '../screen_system';



import {StandartHero} from '../../Game/Heroes/hero_class';
import {Game} from '../../Game/game';
import {maps} from '../../Game/Maps/maps_object'


var game, scene;
console.log("me")
export default class GameScreen extends Screen{
	constructor(){
		super();
		this.display = document.querySelector('.template').content.querySelector('.gameScreen').cloneNode(true);
	}

	enter(exitCallback){
		scene = new THREE.Scene();
		game = new Game(maps.firstMap, scene);
		window.game = game;
		game.init(scene);

		this.exitCallback = exitCallback;
	}
}
