import StateMachine, {State} from '../Utils/state_machine';
import GameBetweenWavesState from './gameBetweenWaves_state';
import GameLostState from './gameLost_state';
import GameEndedState from './gameEnded_state'

import MenuModule from '../../ScreenSystem/Modules/Game/menu_module';

import App from '../../main';

var deltaTime,
    mvtTime = 0,
    newTime = 0,
    oldTime = 0;


export default class GameRunningState extends State {
  constructor(game){
    super()
    this.game = game;

    oldTime = Date.now();
    newTime = Date.now();
    deltaTime = newTime - oldTime;
    oldTime = newTime;

    mvtTime += deltaTime;
  }

  update(){

    const {hero,map,enemyFactory,wavesSystem, stateMachine} = this.game;


    newTime = Date.now();
    deltaTime = newTime - oldTime;
    oldTime = newTime;

    mvtTime += deltaTime;

    hero.update(mvtTime,this.game);
    map.drill.update(this.game,this.game.context.scene, mvtTime);
    enemyFactory.update(mvtTime, this.game);

    wavesSystem.update(deltaTime);

    if(hero.lifes === 0 || map.drill.life === 0) stateMachine.changeState(new GameEndedState(this.game, "defeat"));

  }
}
