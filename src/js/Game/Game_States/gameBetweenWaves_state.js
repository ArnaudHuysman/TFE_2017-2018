import StateMachine, {State} from '../Utils/state_machine';
import GameRunningState from './gameRunning_state';
import StateModule from '../../ScreenSystem/Modules/Game/State_module'

export default class GameBetweenWavesState extends State {
  constructor(game){
    super()
    this.game = game;
  }

  enter(){
    this.game.screen.moduleSystem.setModule(new StateModule(this.game, "Begin"));
    setTimeout( this.timeout.bind(this), 2000);

  }

  timeout(){
    this.game.stateMachine.changeState(new GameRunningState(this.game))
  }
}
