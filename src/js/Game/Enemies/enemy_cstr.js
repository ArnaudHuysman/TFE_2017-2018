import {getCubeMapValue} from '../Utils/path_functions';
import Cube from '../Utils/cube_cstr';
import {Bullet} from '../Heroes/bulletFactory';

class LifeBar {
  constructor(width, depth) {
    this.width = width;
    this.depth = depth;
    this.geom = new THREE.BoxGeometry(width*4, 4, 4, 2, 2, 2);
    this.mat = new THREE.MeshToonMaterial( {
						bumpScale: 1,
						color: 0x2BFF9F,
						specular: 0x9EC5AB,
						reflectivity: 0,
						shininess: 40
		});
    //this.mat = new THREE.MeshBasicMaterial({ color: color , side: THREE.BackSide })
    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.mesh.position.z = depth*2 + 10;
  }

  update(){

  }
}

export default class Enemy {
  constructor(width, height, depth, color, outColor, name, game, lifes, speed) {

    this.body = new Cube(width, height, depth, color, outColor, name);

    this.lifebar = new LifeBar(width, depth);

    this.lifes = lifes;
    this.totalLifes = lifes;

    this.speed = speed;

    this.name = name;
    this.game = game;
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

    const {object} = this.body;
    let pos = {
      x: object.position.x,
      y: object.position.y,
      z: -10
    }
    let value = getCubeMapValue(this.game,pos)
    this.tilePos = value !== undefined ? value.arrayPos : this.tilePos ;


    // if(this.targetPosition){
    //
    //   let lookAtPoint = new THREE.Vector3(this.targetPosition,this.targetPosition,10);
    //
    //   this.body.object.up = new THREE.Vector3(0,0,1);
    //
    //   this.body.object.lookAt(lookAtPoint);
    //
    // }



    this.lifebar.mesh.position.set(object.position.x,object.position.y,object.position.z+this.lifebar.depth*2);



    if(this.body.collision) {
      if(this.body.objectInCollision.name == "hero_bullet") {
        this.game.context.scene.add(this.lifebar.mesh);
        this.lifes-- ;
        this.lifebar.mesh.scale.x = this.lifes/this.totalLifes;
        this.game.collisionEngine.removeBody(this.body.objectInCollision, "hero_projectil");
        this.body.collision = false;
        this.body.objectInColllision = null;
      }
    };

    if(this.lifes <= 0 ) this.game.enemyFactory.removeSelf(this.game, this);
  }
  //Animation of movement and attack
  animation(){
  }

  //Movement towards target
  move(){
  }

}
