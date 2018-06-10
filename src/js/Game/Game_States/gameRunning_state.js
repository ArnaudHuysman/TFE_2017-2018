import StateMachine, {State} from '../Utils/state_machine';
import {initWaves, updateWaves} from '../System/waves';

export default class GameRunningState extends State {
  constructor(game){
    super()
    this.game = game;
  }
  update(mvtTime){
    this.game.hero.update(mvtTime,this.game);
    this.game.map.drill.update(this.game,this.game.context.scene);
    updateWaves(this.game,this.game.context.scene,mvtTime);
  }
}
