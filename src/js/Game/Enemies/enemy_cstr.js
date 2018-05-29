import {getCubeMapValue} from '../Utils/path_functions';
import Cube from '../Utils/cube_cstr';
import {Bullet} from '../Heroes/bulletFactory'

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
    this.tilePos = value !== undefined ? value.arrayPos : this.tilePos ;


    if(this.body.collision) {
      console.log("COLL");
      if(this.body.objectInCollision instanceof Bullet) {
        this.lifes-- ;
        this.currentGame.collisionEngine.removeBody(this.body.objectInCollision, "hero_projectil");
      } else this.hitAction(this.body.objectInCollision) ;


      this.body.collision = false;
      this.body.objectInColllision = null;
    };

    if(this.lifes <= 0 ) this.currentGame.enemyFactory.removeSelf(this.currentGame, this);
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
