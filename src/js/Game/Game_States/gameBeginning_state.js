import StateMachine, {State} from '../Utils/state_machine';
import GameRunningState from './gameRunning_state'
import {StandartHero} from '../Heroes/hero_class';
import {initWaves, updateWaves} from '../System/waves';
import EnemyFactory from '../Enemies/enemy_factory';


export default class GameBeginningState extends State {
  constructor(game){
    super()
    this.game = game;
  }

  enter(){
    console.log("Game Beginning")

    let self = this;
    TweenMax.to(this.game.context.camera.position, 2, {
        y : -850,
        z : 800,
        ease: Power0.easeInOut,
        onComplete: this.tweenCompleted.bind(this)
    })
  }

  update(mvtTime){
    this.game.context.camera.lookAt(0, 0, -50);
  }

  tweenCompleted(){
    this.game.hero = new StandartHero(this.game,this.game.context.scene);
    this.game.hero.char.object.position.z = 12;
    this.game.hero.char.object.position.x = -30;
    this.game.hero.char.object.position.y = 30;

    this.game.collisionEngine.addBody(this.game.hero.char,"hero");

    this.game.enemyFactory = new EnemyFactory(this.game,this.game.context.scene);
    initWaves(this.game);

    this.game.stateMachine.changeState(new GameRunningState(this.game));

  }

}
