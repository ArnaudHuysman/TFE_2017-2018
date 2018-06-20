import StateMachine, {State} from '../Utils/state_machine';
import GameLostState from './gameLost_state'
import GameWinState from './gameWin_state'

export default class GameEndedState extends State {
  constructor(game, state){
    super()
    this.game = game;
    this.state = state;

  }

  enter(){
    console.log("Game Ended");

    switch (this.state) {
      case "defeat":
        this.game.stateMachine.changeState(new GameLostState(this.game));
        break;
      case "victory":
        this.game.stateMachine.changeState(new GameWinState(this.game));
        break;
      default:
    }

  }

  exit(){
    const {scene}  = this.game.context
    while(scene.children.length > 0){
      scene.remove(scene.children[0]); 
    }
  }
}
