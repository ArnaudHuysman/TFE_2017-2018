

export default class ScreenSystem {

	constructor(container){
		this.container = container;

		this.currentScreen = null;
	}

	setScreen(nextScreen){

		this.previousScreen = this.currentScreen;
		this.currentScreen = nextScreen;

		if( this.previousScreen){
			this.removeScreen(this.previousScreen.display);
		}

		this.container.appendChild(this.currentScreen.display);
		this.currentScreen.enter(this.setScreen.bind(this))
	}

	removeScreen(previousScreen){
		this.container.removeChild(previousScreen)
	}
}

export class Screen {
	constructor(){
		this.display = null;
	}

	enter(){};

	exit(){};

	update(){};
}
