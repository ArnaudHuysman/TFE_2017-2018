import {getCubeMapValue} from '../Maps/testPosition';

export default class Enemy {
  constructor(width, height, depth, color, name, game) {

    this.object  = new THREE.Object3D();

    this.geom = new THREE.BoxGeometry(width, height, depth, 2, 2, 2);
    this.mat = new THREE.MeshPhongMaterial({color, flatShading: true});

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.outlinerMat = new THREE.MeshBasicMaterial({ color: 0x30323d , side: THREE.BackSide })
    this.outliner = new THREE.Mesh(this.geom, this.outlinerMat);

    this.outliner.scale.multiplyScalar(1.1);

    this.object.add(this.mesh);
    this.object.add(this.outliner);

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

  update(time){


    let pos = {
      x: this.object.position.x,
      y: this.object.position.y,
      z: -10
    }
    this.tilePos = getCubeMapValue(this.currentGame,pos);

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
    this.mvt = false;
  }
}
