class Enemy {
  constructor(width, height, depth, color, name) {

    this.geom = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({color, flatShading: true});

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    //this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.name = name;
    this.collison = false;
    this.objectInCollision = null;
    this.mvt = true;

  }

  update(){

    if(this.collision) this.hitAction(this.objectInColllision);

    if(this.mvt) this.move();
  }
  //Animation of movement and attack
  animation(){

  }

  //Movement towards target
  move(speed,target){


    var diffX = 0 - this.mesh.position.x;
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

  }

  hitAction(hitableObjects){

    this.mvt = false;

    TweenMax.to(this.mesh.position, 1,
    {
        z:50,
        repeat: 2,
        yoyo:true,
    });
    
  }
}

class SimpleEnemy extends Enemy {
  constructor(width, height, depth, color, name){
    super(width, height, depth, color, name);
  }

  animation(){

    

  }

}

function removeSelf(){
  console.log("remove");
  /*scene.remove(obj.mesh);
    let index = Game.enemies.indexOf(obj);


    if (index >= 0)
    {
      Game.enemies.splice(index,1);
    }
    enemiesCollision.removeBody(obj);

    obj.collision = false;
    obj.objectInColllision = null;*/
}

var blobl;

function enemiesSpawn() {

  blobl = new SimpleEnemy(4,4,4,0x99C24D, "blobl");
  blobl.mesh.position.x += 150;
  blobl.mesh.position.y += 150;
  blobl.mesh.position.z += 10;
  blobl.mesh.scale.set(2,2,2);

  scene.add(blobl.mesh);
  Game.enemies.push(blobl);
  enemiesCollision.addBody(blobl);
  //Game.collidableMesh.push(blobl.mesh);

}
