import StateMachine, {State} from '../Utils/state_machine';
import {initWaves, updateWaves} from '../System/waves';

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

    if(!this.game.paused) {

      newTime = Date.now();
      deltaTime = newTime - oldTime;
      oldTime = newTime;

      mvtTime += deltaTime;

      this.game.hero.update(mvtTime,this.game);

      this.game.map.drill.update(this.game,this.game.context.scene, mvtTime);

      this.game.enemyFactory.update(mvtTime, this.game);
      updateWaves(this.game,this.game.context.scene,mvtTime);

    } else {
      oldTime = Date.now();
    }

  }
}
