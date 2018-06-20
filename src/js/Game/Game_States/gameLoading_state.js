import StateMachine, {State} from '../Utils/state_machine';
import GameBeginningState from './gameBeginning_state';

export default class GameLoadingState extends State {
  constructor(game){
    super()
    this.game = game;
  }

  enter(){

      this.game.context.generateScene();
  }

  update(){

    if(this.game.context.loaded){
      this.game.stateMachine.changeState(new GameBeginningState(this.game))
    }
  }

  exit(){
    console.log("Loading Complete");
  }
}
