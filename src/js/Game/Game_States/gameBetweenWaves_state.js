import StateMachine, {State} from '../Utils/state_machine';
import GameRunningState from './gameRunning_state';
import StateModule from '../../ScreenSystem/Modules/Game/State_module'

export default class GameBetweenWavesState extends State {
  constructor(game, wave){
    super()
    this.game = game;
    this.wave = wave;
  }

  enter(){

    let text = "Waves "+ this.wave.wave.n + "/" + this.game.map.info.waves.length;
    this.game.screen.moduleSystem.setModule(new StateModule(this.game, text));
    setTimeout( this.timeout.bind(this), 2000);

  }

  timeout(){
    this.game.stateMachine.changeState(new GameRunningState(this.game))
  }
}
