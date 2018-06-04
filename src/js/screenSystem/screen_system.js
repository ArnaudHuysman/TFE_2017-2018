import ModuleSystem from './Modules/Module'

export default class ScreenSystem {

	constructor(container){
		this.container = container;
		this.currentScreen = null;
	}

	setScreen(nextScreen){

		this.previousScreen = this.currentScreen;
		this.currentScreen = nextScreen;

		if( this.previousScreen){
			this.removeScreen(this.previousScreen);
		}
		console.log(this.currentScreen.display);

		for (var i = 0; i < this.currentScreen.display.length; i++) {
			this.container.appendChild(this.currentScreen.display[i]);
		}

		this.currentScreen.enter(this.setScreen.bind(this))
	}

	removeScreen(previousScreen){

		for (var i = 0; i < previousScreen.display.length; i++) {
			this.container.removeChild(previousScreen.display[i]);
		}

	}
}

export class Screen {
	constructor(){
		this.display = null;
		this.moduleContainer = document.querySelector(".module");
		this.moduleSystem = new ModuleSystem(this.moduleContainer);
	}

	enter(){};

	exit(){};

	update(){};
}
