import Enemy from '../enemy_cstr';
import {Drill} from '../../Maps/Map/drill_cstr'
import {getPath, getCubePosition} from '../../Utils/path_functions';
import StateMachine from '../../Utils/state_machine';
import {simpleWalkState} from './simple_states';

import {AnimationSystem} from '../../../animations/animationSystem';



export default class SimpleEnemy extends Enemy {
  constructor(width, height, depth, color, outcolor, name, game){
    super(width, height, depth, color, outcolor, name, game)

    this.lifes = 1;
    this.matrix = game.map.matrix.map( row => row.map(x => { return x !== 1 ? 0 : 1 }));

    this.animationSystem = new AnimationSystem();
    this.stateMachine = new StateMachine( new simpleWalkState(this));

  }

  update(){
    const {hero, map} = this.currentGame;

    super.update();

    this.path = getPath(this.matrix, true, this.tilePos, map.drill.tilePos );
    if(this.path.length > 0) this.targetPosition = this.path[1] ? getCubePosition(map, this.path[1]) : getCubePosition(map, this.path[0]) ;
    else this.targetPosition = [0,0];
    this.stateMachine.currentState.update();

  }

  hitAction(hitableObjects){

  }
}
