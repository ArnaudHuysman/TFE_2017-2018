


import ScreenSystem from './ScreenSystem/screen_system';
import TitleScreen from './ScreenSystem/Screens/title_screen';
import MapScreen from './ScreenSystem/Screens/map_screen';
import GameScreen from './ScreenSystem/Screens/game_screen';
import Images from './img_load.js'



function preloader() {
	if (document.images) {

    for (var i = 0; i < Images.length; i++) {
      var img = new Image();
      img.src = Images[i].src;
    }
	}

  const mainContaint = document.querySelector(".app");
  const AppScreens = new ScreenSystem(mainContaint);

  AppScreens.setScreen(new TitleScreen());
}


function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

addLoadEvent(preloader);
