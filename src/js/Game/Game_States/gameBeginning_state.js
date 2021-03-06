import StateMachine, {State} from '../Utils/state_machine';
import GameRunningState from './gameRunning_state';
import GameBetweenWavesState from './gameBetweenWaves_state'
import {StandartHero} from '../Heroes/hero_class';
import Waves_System from '../System/wave_cstr';
import EnemyFactory from '../Enemies/enemy_factory';
import Utils,{Player,keys, GameObjects}  from '../Utils/utils';
import {Scene, SceneInfo} from '../Scene/Scene';
import StateModule from '../../ScreenSystem/Modules/Game/State_module'

import gsap from 'gsap';
var TweenMax = gsap.TweenMax;
var TimelineMax = gsap.TimelineMax;


export default class GameBeginningState extends State {
  constructor(game){
    super()
    this.game = game;
    this.tween = false;
    this.tweens = [];

    this.passed = false;
  }

  enter(){
    console.log("Game Beginning");
    Utils.handleWindowResize(SceneInfo,this.game);

    const {camera} = this.game.context;

    this.tweens.push(TweenMax.to(camera.position, 3.2, {
        z : -600,
        ease: Power2.easeInOut,
        repeat: 1,
        yoyo: true,
        onComplete: this.secondTweenCompleted.bind(this)
    }))
  }

  exit(){
    this.game.app.audioRessource.play("game-music", true, 0);
    this.game.app.audioRessource.mix(2.5, "game-music");
  }

  update(){
    //Makes caera turns around the map;
    if(!this.passed && Player.isLeftClick) {
      this.tweens[0].kill();
      this.stopTween();
      this.passed = true;
    }

    if(!this.tween){

      const {x,y} = this.game.context.camera.position;

      this.game.context.camera.position.y = y * Math.cos(0.010) - x * Math.sin(0.010);
      this.game.context.camera.position.x = x * Math.cos(0.010) + y * Math.sin(0.010);

      this.game.context.camera.up = new THREE.Vector3(0,0,1);
    }

    this.game.context.camera.lookAt(0, 0, -50);
  }

  secondTweenCompleted(){
    this.tween = true;
    TweenMax.to(this.game.context.camera.position, 1.5, {
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


    setTimeout( this.lauchWaves.bind(this), 2000);

  }

  lauchWaves(){
    this.game.wavesSystem.changeWave();
  }

}
