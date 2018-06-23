import {Screen} from '../screen_system';
import TitleScreen from './title_screen';
import ChoiceScreen from './choice_screen'
import GameScreen from './game_screen'
import {MapScene} from '../../Screen_Scenes/Hero_Choice-Screen/index'
import MapModule from '../Modules/Menu/Map_module'

import MenuModule from '../Modules/Game/menu_module';
export default class MapScreen extends Screen{
	constructor(app){
		super(app);

		this.content = document.querySelector('.template').content.querySelector('.mapScreen').cloneNode(true);
		this.buttons = Array.prototype.slice.call(this.content.querySelectorAll(".buttons"));
		this.maps = this.content.querySelectorAll('.map');

		console.log(this.maps);

		this.display = [];
		this.display.push(this.header);
		this.display.push(this.content);

		this.images = [];

	}

	enter(exitCallback){

		super.enter()

		this.exitCallback = exitCallback;

    for (let button of this.buttons) {
      button.addEventListener('click', this.navigate.bind(this, button), true);
    }

		this.content.querySelector('.fragment-text').innerText = " : " + this.app.playerFragments;
		this.content.addEventListener('click', this.toggleMaps.bind(this), true);

		for (let map of this.maps) {

			let icon = map.querySelector('.map_icon');
			let name = map.dataset.name;


			if(!this.app.maps[name].bought) {
				icon.style.filter = "grayscale(100%)";
				map.querySelector('.map_infoTitle').innerText = "Cost";
				map.querySelector('.map_info').innerText = this.app.maps[name].cost;
			} else {
				map.querySelector('.map_infoTitle').innerText = "Difficulty";
				map.querySelector('.map_info').innerText = this.app.maps[name].difficulty;
				icon.style.filter = "none";
				map.addEventListener('click', this.toggleMaps.bind(this, map, name), true);
			}
		}

	}

	exit(){
	}

	navigate(btn){
		super.navigate()
    let name = btn.className.replace(" buttons", "");

    switch (name) {
      case "textblock--btn":

				let map = this.app.maps[btn.dataset.name];
				this.app.mapSelected = 	JSON.parse(JSON.stringify(map));

        this.exitCallback(new GameScreen(this.app));
        break;
      case "exit":
        this.exitCallback(new TitleScreen(this.app));
        break;
      default:

    }
	}

	toggleMaps(currentMap, name){
		console.log("toggle");

		if(!this.moduleSystem.module && !(currentMap instanceof MouseEvent )){
			 this.moduleSystem.setModule(new MapModule( this, this.app.maps[name]));
		};

		// if(!(currentMap instanceof MouseEvent )){
		// 	let map  = currentMap.querySelector('.description');
		// 	map.style.display = "block";
		// 	let mapSceneCtx = map.querySelector('.description_img');
		// 	let mapName  = map.querySelector('.buttons').dataset.name;
		// 	console.log(mapSceneCtx);
		//
		// 	if(mapSceneCtx.children.length === 0){
		// 		let showreel = new MapScene(mapSceneCtx, this.app.maps[mapName]);
		// 		showreel.init();
		// 	}
		// 	console.log(mapSceneCtx);
		// }

	}

}
