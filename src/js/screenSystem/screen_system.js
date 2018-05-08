
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



class IntroScreen extends Screen{
	constructor(){
		super();
		this.display = document.querySelector('.template').content.querySelector('.introScreen').cloneNode(true);
		this.button = this.display.querySelector('.playButton');

	}

	enter(exitCallback){

		this.exitCallback = exitCallback;
	  this.button.addEventListener('click', this.navigate.bind(this));
	}

	navigate(e){
		this.exitCallback(characterScreen);
	}

}

const introScreen = new IntroScreen();


class CharacterScreen extends Screen{
	constructor(){
		super();
		this.display = document.querySelector('.template').content.querySelector('.characterScreen').cloneNode(true);
		this.button = this.display.querySelector('.playButton');

	}

	enter(exitCallback){

		this.exitCallback = exitCallback;
	  this.button.addEventListener('click', this.navigate.bind(this));
	}

	navigate(e){
		this.exitCallback(gameScreen);
	}
}

const characterScreen = new CharacterScreen();

var game;
class GameScreen extends Screen{
	constructor(){
		super();
		this.display = document.querySelector('.template').content.querySelector('.gameScreen').cloneNode(true);
	}

	enter(exitCallback){
		Heroes.standart = new StandartHero();
		game = new Game(Heroes.standart, maps.firstMap);
		game.init();

		this.exitCallback = exitCallback;
	}
}

const gameScreen = new GameScreen();

const mainContaint = document.querySelector(".app");
const AppScreens = new ScreenSystem(mainContaint);

AppScreens.setScreen(introScreen);
