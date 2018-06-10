import StateMachine, {State} from '../Utils/state_machine';

export default class GameBetweenWavesState extends State {
  constructor(game){
    super()
    this.game = game;
  }

  enter(){
    console.log("Waves beginning")
  }
}
