import StateMachine, {State} from '../Utils/state_machine';
import GameRunningState from './gameRunning_state';
import DefeatModule from '../../ScreenSystem/Modules/Game/Defeat_module'

export default class GameLostState extends State {
  constructor(game){
    super()
    this.game = game;

  }

  enter(){
    console.log("Looser")
    this.game.screen.moduleSystem.setModule(new DefeatModule(this.game));

  }

}
