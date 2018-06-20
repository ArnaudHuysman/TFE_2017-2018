


import ScreenSystem from './ScreenSystem/screen_system';
import TitleScreen from './ScreenSystem/Screens/title_screen';
import MapScreen from './ScreenSystem/Screens/map_screen';
import GameScreen from './ScreenSystem/Screens/game_screen';
import Images from './img_load.js';
import BufferLoader from './Utils/loader'
import {maps} from './Game/Maps/maps_object'

var newTime, deltaTime, lastTime;

export default class App {
	constructor(){

		this.container = document.querySelector(".app");
		this.appScreens = new ScreenSystem(this.container);

		this.audioContext = new AudioContext();
		this.sources = [];
		this.music = true;
		let self = this;
		this.bufferLoader = new BufferLoader(
			this.audioContext,
			[
				'./src/sound/The-Creeping-Blob_Looping.mp3',
				'./src/sound/Sci-Fi-Open_Looping.mp3',
				'./src/sound/Solar-Storm_Looping.mp3',
			],
			this.loaded.bind(this)
		);

		this.maps = maps;
		this.mapSelected = null;
	}

	init(){
		this.bufferLoader.load();
	}

	update(){
		newTime = Date.now();
		deltaTime = newTime - lastTime ;
		lastTime = newTime;

		this.appScreens.updateScreen(deltaTime);

		requestAnimationFrame(this.update.bind(this));
	}

	loaded(bufferList){

		for (var i = 0; i < bufferList.length; i++) {
			let source = this.audioContext.createBufferSource();
			source = createSource(bufferList[i], this.audioContext)
			this.sources.push(source);
		}

		this.sources[0].gainNode.gain.value = 0;
		this.sources[0].source.start(0);
		
		this.appScreens.setScreen(new TitleScreen(this));
		this.update();
	}
}

function createSource(buffer, context) {
  var source = context.createBufferSource();
  var gainNode = context.createGain ? context.createGain() : context.createGainNode();
  source.buffer = buffer;
  source.loop = true;
  source.connect(gainNode);
  gainNode.connect(context.destination);
  return {
    source: source,
    gainNode: gainNode
  };
}
const app = new App();
app.init();
