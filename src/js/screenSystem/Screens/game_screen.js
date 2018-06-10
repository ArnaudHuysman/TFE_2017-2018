import {Screen} from '../screen_system';



import {StandartHero} from '../../Game/Heroes/hero_class';
import {Game} from '../../Game/game';
import {scene} from '../../Game/Scene/Scene';
import {maps} from '../../Game/Maps/maps_object'

import Images from '../../img_load';


var game;

export default class GameScreen extends Screen{
	constructor(){
		super();
		this.pageReady = false;
		this.images = Images;

		this.header = document.querySelector('.header_template').content.querySelector('.header').cloneNode(true);
		this.content = document.querySelector('.template').content.querySelector('.gameScreen').cloneNode(true);
		this.buttons = this.content.querySelectorAll('.buttons');

		this.display = [];
		this.display.push(this.header);
		this.display.push(this.content);

	}

	enter(exitCallback){
		console.log("neter")
		this.game = new Game(maps.firstMap);
		window.game = game;
		this.game.init();

		this.exitCallback = exitCallback;
	}

	update(){

		this.content.querySelector('.fragment').innerHTML = this.game.screenInfo.fragment;
		this.content.querySelector('.lifes').innerHTML = this.game.screenInfo.hero_lifes ;
		this.content.querySelector('.drilllifes').innerHTML = this.game.screenInfo.drill_lifes ;
		this.content.querySelector('.waves').innerHTML = this.game.screenInfo.waves + "/" + this.game.screenInfo.totalWaves;


	}
}
