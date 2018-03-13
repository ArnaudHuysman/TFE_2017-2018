/*var screens = document.querySelectorAll(".screen")

screens.forEach.call( screens, (screen) => {
	console.log(screen);
	screen.style.display = "none";
});
*/




class ScreenSystem {

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
				
		console.log(this.currentScreen);
		this.container.appendChild(this.currentScreen.display);
		this.currentScreen.enter(this.setScreen.bind(this))
	}

	removeScreen(previousScreen){
		this.container.removeChild(previousScreen)
	}
}





class Screen {
	constructor(){
		this.display = null;
	}

	enter(){};

	exit(){};

	update(){};


}

function log(){
	console.log("work plz");
}

class MainScreen extends Screen{
	constructor(){
		super();
		this.display = document.querySelector('.template').content.querySelector('.mainScreen').cloneNode(true);
		this.button = this.display.querySelector('button');

	}

	enter(exitCallback){

		this.exitCallback = exitCallback;

		console.log(this.button);
	    this.button.addEventListener('click', this.navigate.bind(this));
	}

	navigate(e){
		console.log("yeah");
		this.exitCallback(secondScreen);	
	}
}

const mainScreen = new MainScreen();


class SecondScreen extends Screen{
	constructor(){
		super();
		this.display = document.querySelector('.template').content.querySelector('.secondScreen').cloneNode(true);
	}

	enter(exitCallback){

		this.exitCallback = exitCallback;	
	}
}

const secondScreen = new SecondScreen();


const mainContaint = document.querySelector(".app");
const AppScreens = new ScreenSystem(mainContaint);

AppScreens.setScreen(mainScreen);