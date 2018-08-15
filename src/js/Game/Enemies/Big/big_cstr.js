import Enemy from '../enemy_cstr';
import {getPath, getCubePosition, getRandomTiles} from '../../Utils/path_functions';

import StateMachine from '../../Utils/state_machine';
import {bigWalkState, bigSpawnState} from './big_states';

import {AnimationSystem} from '../../../animations/animationSystem';

import gsap from 'gsap';
var TweenMax = gsap.TweenMax;


export default class BigEnemy extends Enemy {
  constructor(width, height, depth, color, outcolor, name, game, lifes, speed){
    super(width, height, depth, color, outcolor, name, game, lifes, speed);

    this.mvtInterval = 0;
    this.mvtDelay = 10000;

    this.popDelay = 10000;
    this.popInterval = this.popDelay;


    this.animationSystem = new AnimationSystem();
    this.stateMachine = new StateMachine( new bigSpawnState(this));

    this.matrix = game.map.matrix.map( (row,i) => row.map( (x,j) => {
      if( x !== 0) return 1;
      else if ( i < 5 || i > 15 || j < 5 || j > 15) return 0;
      else return 1;
    }));

    let self = this;

  }

  update(tp){

    const {hero, map} = this.game;

    super.update();

    if( this.mvtInterval < tp){
      this.target = getRandomTiles(this.game, map.spawTiles);
      this.mvtInterval = tp+this.mvtDelay;
    }

    if(this.lifes <= 0 ) {
      if(this.animationSystem.currentAnimation && this.animationSystem.currentAnimation.interval) window.clearInterval(this.animationSystem.currentAnimation.interval);
    }

    this.path = getPath(this.matrix, false, this.tilePos, this.target.arrayPos );

    this.targetPosition = this.path[1] ? getCubePosition(map, this.path[1]) : getCubePosition(map, this.path[0]) ;

    this.stateMachine.currentState.update(tp);
  }

  spawnSimple(){


  }
}
