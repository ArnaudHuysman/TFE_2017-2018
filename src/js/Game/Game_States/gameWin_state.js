import StateMachine, {State} from '../Utils/state_machine';
import GameRunningState from './gameRunning_state';
import VictoryModule from '../../ScreenSystem/Modules/Game/Victory_module'

export default class GameWinState extends State {
  constructor(game){
    super()
    this.game = game;

  }

  enter(){
    console.log("GG")
    this.game.screen.moduleSystem.setModule(new VictoryModule(this.game));

    this.game.app.playerFragments += this.game.hero.fragments;

  }

  exit(){
    const {scene}  = this.game.context
    while(scene.children.length > 0){
      scene.remove(scene.children[0]);
    }
  }

}
