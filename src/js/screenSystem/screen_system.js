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

		this.currentScreen.resumeLoading(this.enterScreen.bind(this));
	}

	enterScreen(){
		for (var i = 0; i < this.currentScreen.display.length; i++) {
			this.container.appendChild(this.currentScreen.display[i]);
		}

		this.currentScreen.enter(this.setScreen.bind(this))
	}

	updateScreen(dt){
		if(this.currentScreen.pageReady) this.currentScreen.update(dt);
	}

	removeScreen(previousScreen){
		previousScreen.exit();
		for (var i = 0; i < previousScreen.display.length; i++) {
			this.container.removeChild(previousScreen.display[i]);
		}

	}
}

export class Screen {
	constructor(app){
		this.app = app;
		this.pageReady = false;
		this.display = null;

		this.header = document.querySelector('.header_template').content.querySelector('.header').cloneNode(true);
		this.headerButtons = this.header.querySelectorAll('.buttons');

		console.log(this.headerButtons)

		this.moduleContainer = document.querySelector(".module");
		this.moduleSystem = new ModuleSystem(this.moduleContainer);

	}

	enter(){
		console.log("enter")
		for (var button of this.headerButtons) {
			button.addEventListener('click', this.headerNavigate.bind(this, button));
		}

	};

	exit(){};

	update(){};

	headerNavigate(btn){

		let name = btn.className.replace(" buttons", "");
    switch (name) {
      case "music":
        this.app.audioRessource.mute("music");
        break;
      case "sound":
				this.app.audioRessource.mute("sound");
        break;
      default:

    }

	};

	resumeLoading(enterCallback){
		this.enterCallback = enterCallback;
		if(this.images.length <= 0){
				this.pageReady = true;
		} else {
			let imageSrc = this.images.shift();
			console.log(imageSrc);
			let image = new Image();
			image.addEventListener('load', this.resumeLoading.bind(this,this.enterCallback) )
			image.src = imageSrc.src;
		}

		if(this.pageReady) this.enterCallback();
	}
}
