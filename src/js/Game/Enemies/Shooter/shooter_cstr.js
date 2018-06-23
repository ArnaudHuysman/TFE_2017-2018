import Enemy from '../enemy_cstr';
import {getPath, getCubePosition} from '../../Utils/path_functions';
import BulletFactory from './bullet_factory'
import {shooterWalkState} from './shooter_states'

import StateMachine from '../../Utils/state_machine';
import {AnimationSystem} from '../../../animations/animationSystem';

import gsap from 'gsap';
var TweenMax = gsap.TweenMax;


export default class ShooterEnemy extends Enemy {
  constructor(width, height, depth, color, outColor, name, game, lifes, speed, factory){
    super(width, height, depth, color, outColor, name, game, lifes, speed);

    this.factory = factory;

    this.fireRate = 1000;
    this.interval = 0;

    this.animationSystem = new AnimationSystem();
    this.stateMachine = new StateMachine( new shooterWalkState(this));

    this.matrix = game.map.matrix.map( row => row.map(x => { return x !== 0 ? 1 : 0 }));

  }

  animation(){
  }

  update(time,scene){

    const {hero, map} = this.game;

    super.update();


    let targetPos = hero.tilePos ? hero.tilePos : this.tilePos;

    this.path = getPath(this.matrix, true, this.tilePos, targetPos, map );

    if( this.path.length > 0 ) {
      if(this.path[10]){
        this.canShoot = false;
        this.targetPosition = getCubePosition(map, this.path[1])
      } else {
        this.canShoot = true;
        this.targetPosition = getCubePosition(map, this.path[0])
      }
    }
    //this.shoot(time,scene);

    this.stateMachine.currentState.update();

  }
}
