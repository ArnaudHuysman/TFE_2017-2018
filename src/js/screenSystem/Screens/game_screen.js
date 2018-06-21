import {Screen} from '../screen_system';

import {StandartHero} from '../../Game/Heroes/hero_class';
import {Game} from '../../Game/game';
import GameRunningState from '../../Game/Game_States/gameRunning_state'
import {scene} from '../../Game/Scene/Scene';

import MenuModule from '../Modules/Game/menu_module';


var game;

export default class GameScreen extends Screen{
	constructor(app){
		super(app);
		this.pageReady = false;
		this.images = [];

		this.content = document.querySelector('.template').content.querySelector('.gameScreen').cloneNode(true);
		this.buttons = Array.prototype.slice.call(this.content.querySelectorAll(".buttons")).concat(Array.prototype.slice.call(this.header.querySelectorAll(".buttons")));

		this.display = [];
		this.display.push(this.header);
		this.display.push(this.content);
		this.ambianceVolume = 0;
		this.musicVolume = 0;

	}

	enter(exitCallback){

		super.enter()

		this.game = new Game(this.app.mapSelected);
		window.game = game;
		this.game.init(this);
		this.game.app = this.app;

		for (var button of this.buttons) {
      button.addEventListener('click', this.navigate.bind(this, button));
    }

		this.app.audioRessource.play("game-amb", true);
		this.app.audioRessource.mix(2, "game-amb", "menu-music");

		this.exitCallback = exitCallback;
	}

	update(dt){

		this.content.querySelector('.fragment-text').innerHTML = ": " + this.game.screenInfo.fragment;
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
