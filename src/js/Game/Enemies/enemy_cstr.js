import {getCubeMapValue} from '../Utils/path_functions';
import Cube from '../Utils/cube_cstr';


export default class Enemy {
  constructor(width, height, depth, color, outColor, name, game) {

    this.body = new Cube(width, height, depth, color, outColor, name);

    this.name = name;
    this.currentGame = game;
    this.collision = false;
    this.objectInCollision = null;
    this.mvt = true;
    this.target = null;
    this.tilePos = null;
    this.path = null;
    this.targetPosition = null;
    this.updateInterval = 0;


  }

  update(time,scene){


    let pos = {
      x: this.body.object.position.x,
      y: this.body.object.position.y,
      z: -10
    }
    let value = getCubeMapValue(this.currentGame,pos)
    this.tilePos = value !== undefined ? value : this.tilePos ;


    if(this.collision) {
      this.hitAction(this.objectInCollision);
    };
  }
  //Animation of movement and attack
  animation(){
  }

  //Movement towards target
  move(){
  }

  hitAction(hitableObjects){
  //  this.mvt = false;
  }
}
