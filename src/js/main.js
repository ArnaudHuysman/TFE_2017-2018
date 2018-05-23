


import ScreenSystem from './ScreenSystem/screen_system';
import TitleScreen from './ScreenSystem/Screens/title_screen';
import GameScreen from './ScreenSystem/Screens/game_screen';



const mainContaint = document.querySelector(".app");
const AppScreens = new ScreenSystem(mainContaint);

AppScreens.setScreen(new GameScreen());
