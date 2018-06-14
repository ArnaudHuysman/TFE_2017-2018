


import ScreenSystem from './ScreenSystem/screen_system';
import TitleScreen from './ScreenSystem/Screens/title_screen';
import MapScreen from './ScreenSystem/Screens/map_screen';
import GameScreen from './ScreenSystem/Screens/game_screen';
import Images from './img_load.js'

var newTime, deltaTime, lastTime;

const App = (function(){

	return {
		init: function () {
			this.container = document.querySelector(".app");
			this.appScreens = new ScreenSystem(this.container);
			this.appScreens.setScreen(new TitleScreen());
			this.update();
		},
		update: function() {

			newTime = Date.now();
			deltaTime = newTime - lastTime ;
			lastTime = newTime;

			this.appScreens.updateScreen();

			requestAnimationFrame(this.update.bind(this));
		}
	}
})();

App.init()

export default App;
