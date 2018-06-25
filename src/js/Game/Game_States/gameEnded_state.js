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

    for (var i = 0; i < this.game.enemyFactory.entities.length; i++) {
      if(this.game.enemyFactory.entities[i].animationSystem.currentAnimation)this.game.enemyFactory.entities[i].animationSystem.currentAnimation.out();
      if(this.game.enemyFactory.entities[i].stateMachine.currentState.interval) {
        window.clearInterval(this.game.enemyFactory.entities[i].stateMachine.currentState.interval);
      }
    }

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
  }
}
