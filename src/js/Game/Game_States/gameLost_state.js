import StateMachine, {State} from '../Utils/state_machine';
import GameRunningState from './gameRunning_state';
import DefeatModule from '../../ScreenSystem/Modules/Game/Defeat_module'

import gsap from 'gsap';
var TweenMax = gsap.TweenMax;

export default class GameLostState extends State {
  constructor(game){
    super()
    this.game = game;

  }

  enter(){
    console.log("Looser")

    let self = this;



    TweenMax.to(this.game.map.drill.drill_cstr.object.position, 1.5,
															{
																	z:-400,
																	ease: Power4.easeIn,
																	onComplete: function(){
																		self.game.stateMachine.out();
																	}
															})

  }

  exit(){
    
    const {scene}  = this.game.context;
    while(scene.children.length > 0){
      scene.remove(scene.children[0]);
    }

    this.game.screen.moduleSystem.setModule(new DefeatModule(this.game));
  }

}
