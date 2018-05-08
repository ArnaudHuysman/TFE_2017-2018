class Enemy {
  constructor(width, height, depth, color, name) {

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
    this.collision = false;
    this.objectInCollision = null;
    this.mvt = true;

  }

  update(){

    if(this.collision) {
      this.hitAction(this.objectInCollision);
    };
  }
  //Animation of movement and attack
  animation(){


  }

  //Movement towards target
  move(speed,target){


    /*var diffX = 0 - this.mesh.position.x;
    var diffY = 0 - this.mesh.position.y;

    var theta = Math.atan2(diffY, diffX);

    var mvtX = Math.cos(theta);
    var mvtY = Math.sin(theta);

    this.mesh.position.x += mvtX*1;
    this.mesh.position.y += mvtY*1;

    if( Math.ceil(Player.targetPos.x/10) == Math.ceil(this.mesh.position.x/10)
    && Math.ceil(Player.targetPos.y/10) == Math.ceil(this.mesh.position.y/10))
    {

      this.mvt = false;
    } else {
      this.mvt = true;
    }
*/

  }

  hitAction(hitableObjects){
    this.mvt = false;

  }
}
