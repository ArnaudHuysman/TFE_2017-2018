import {Screen} from '../screen_system';

import {StandartHero} from '../../Game/Heroes/hero_class';
import {Game} from '../../Game/game';
import {scene} from '../../Game/Scene/Scene';
import {maps} from '../../Game/Maps/maps_object'

import Images from '../../img_load';

import MenuModule from '../Modules/Game/menu_module';


var game;

export default class GameScreen extends Screen{
	constructor(mapName){
		super();
		this.pageReady = false;
		this.images = Images;

		this.mapName = mapName;

		this.header = document.querySelector('.header_template').content.querySelector('.header').cloneNode(true);
		this.content = document.querySelector('.template').content.querySelector('.gameScreen').cloneNode(true);
		this.buttons = Array.prototype.slice.call(this.content.querySelectorAll(".buttons")).concat(Array.prototype.slice.call(this.header.querySelectorAll(".buttons")));

		this.display = [];
		this.display.push(this.header);
		this.display.push(this.content);

	}

	enter(exitCallback){
		this.game = new Game(maps[this.mapName]);
		window.game = game;
		this.game.init();

		for (var button of this.buttons) {
      button.addEventListener('click', this.navigate.bind(this, button));
    }

		this.exitCallback = exitCallback;
	}

	update(){

		this.content.querySelector('.fragment').innerHTML = this.game.screenInfo.fragment;
		this.content.querySelector('.lifes').innerHTML = this.game.screenInfo.hero_lifes ;
		this.content.querySelector('.drilllifes').innerHTML = this.game.screenInfo.drill_lifes ;
		this.content.querySelector('.waves').innerHTML = this.game.screenInfo.waves + "/" + this.game.screenInfo.totalWaves;

		if(this.game.paused){
			if(!this.moduleSystem.module){
				 this.moduleSystem.setModule(new MenuModule(this.game));
			 };
		}

	}
	navigate(btn){

		let name = btn.className.replace(" buttons", "");

		switch (name) {
			case "option":
					 this.game.paused = true;
				break;
			default:

		}
	}
}
