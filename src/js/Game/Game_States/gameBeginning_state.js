import StateMachine, {State} from '../Utils/state_machine';
import GameRunningState from './gameRunning_state';
import GameBetweenWavesState from './gameBetweenWaves_state'
import {StandartHero} from '../Heroes/hero_class';
import {initWaves, updateWaves} from '../System/waves';
import Waves_System from '../System/wave_cstr';
import EnemyFactory from '../Enemies/enemy_factory';
import Utils,{Player,keys, GameObjects}  from '../Utils/utils';
import {Scene, SceneInfo} from '../Scene/Scene';
import StateModule from '../../ScreenSystem/Modules/Game/State_module'


export default class GameBeginningState extends State {
  constructor(game){
    super()
    this.game = game;
    this.tween = false;
    this.tweens = [];
  }

  enter(){
    console.log("Game Beginning");
    Utils.handleWindowResize(SceneInfo,this.game);

    this.tweens.push(TweenMax.to(this.game.context.camera.position, 6, {
        z : -800,
        ease: Power0.easeInOut,
        repeat: 1,
        yoyo: true,
        onComplete: this.secondTweenCompleted.bind(this)
    }))
  }

  exit(){
    this.game.app.sources[1].gainNode.gain.value = 0;
    this.game.app.sources[1].source.start(0);
  }

  update(){
    //Makes caera turns around the map;
    if(Player.isLeftClick) {
      this.tweens[0].kill();
      this.stopTween();
    }

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

  stopTween(){
    this.tween = true;
    TweenMax.to(this.game.context.camera.position, 1, {
        y : -850,
        z : 800,
        x : 0,
        ease: Power0.easeOut,
        onComplete: this.mainTweenCompleted.bind(this)
    })
  }

  mainTweenCompleted(){

		this.game.context.camera.lookAt( 0,0, -50 );

    this.game.hero = new StandartHero(this.game,this.game.context.scene);
    this.game.hero.char.object.position.z = 12;
    this.game.hero.char.object.position.x = -30;
    this.game.hero.char.object.position.y = 30;
    this.game.hero.char.object.lookAt(0,0,12);

    this.game.collisionEngine.addBody(this.game.hero.char,"hero");

    this.game.enemyFactory = new EnemyFactory(this.game,this.game.context.scene);
    this.game.wavesSystem = new Waves_System(this.game.map.info.waves, this.game);

    let text = "Begin";
    this.game.screen.moduleSystem.setModule(new StateModule(this.game, text));
    this.game.wavesSystem.startWaves();
    this.game.wavesSystem.update(60);

    setTimeout( this.lauchWaves.bind(this), 2000);

  }

  lauchWaves(){
    this.game.stateMachine.changeState(new GameBetweenWavesState(this.game, this.game.wavesSystem.currentWave))
  }

}
