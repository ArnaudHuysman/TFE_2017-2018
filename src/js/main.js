


import ScreenSystem from './ScreenSystem/screen_system';
import TitleScreen from './ScreenSystem/Screens/title_screen';
import MapScreen from './ScreenSystem/Screens/map_screen';
import GameScreen from './ScreenSystem/Screens/game_screen';
import Images from './img_load.js';
import BufferLoader from './Utils/loader'
import {maps} from './Game/Maps/maps_object'

import AudioRessource from './Utils/audio_ressource'
import Audios from './Utils/audios';

var newTime, deltaTime, lastTime;

export default class App {
	constructor(){

		this.container = document.querySelector(".app");
		this.appScreens = new ScreenSystem(this.container);
		this.music = true;
		this.audioRessource = new AudioRessource(Audios, this.loaded.bind(this));

		this.maps = maps;
		this.mapSelected = null;
	}

	update(){
		newTime = Date.now();
		deltaTime = newTime - lastTime ;
		lastTime = newTime;

		this.appScreens.updateScreen(deltaTime);

		requestAnimationFrame(this.update.bind(this));
	}

	loaded(){

		this.audioRessource.play("menu-music", true);
		this.audioRessource.mix(1, "menu-music" );
		this.appScreens.setScreen(new TitleScreen(this));
		this.update();
	}
}

const app = new App();
