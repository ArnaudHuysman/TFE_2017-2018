import StateMachine, {State} from '../Utils/state_machine';
import GameRunningState from './gameRunning_state'
import {StandartHero} from '../Heroes/hero_class';
import {initWaves, updateWaves} from '../System/waves';
import EnemyFactory from '../Enemies/enemy_factory';


export default class GameBeginningState extends State {
  constructor(game){
    super()
    this.game = game;
    this.tween = false;
  }

  enter(){
    console.log("Game Beginning")

    let self = this;
    TweenMax.to(this.game.context.camera.position, 1, {
        z : -800,
        ease: Power0.easeInOut,
        repeat: 1,
        yoyo: true,
        onComplete: this.secondTweenCompleted.bind(this)
    })
  }

  update(){
    //Makes caera turns around the map;
    if(!this.tween){
      var x = this.game.context.camera.position.x;
      var y = this.game.context.camera.position.y;
      this.game.context.camera.position.y = y * Math.cos(0.005) + x * Math.sin(0.005);
      this.game.context.camera.position.x = x * Math.cos(0.005) - y * Math.sin(0.005);

      this.game.context.camera.up = new THREE.Vector3(0,0,1);
    }

    this.game.context.camera.lookAt(0, 0, -50);
  }

  secondTweenCompleted(){
    this.tween = true;
    TweenMax.to(this.game.context.camera.position, 2.5, {
        y : -850,
        z : 800,
        x : 0,
        ease: Power0.easeIn,
        onComplete: this.mainTweenCompleted.bind(this)
    })
  }

  mainTweenCompleted(){

		this.game.context.camera.lookAt( 0,0, -50 );

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
