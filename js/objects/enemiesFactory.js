class Enemy {
  constructor(width, height, depth, color, name) {

    this.geom = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({color, shading:THREE.FlatShading});

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    //this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.name = name;

  }

  //Animation of movement and attack
  animation(){

  }

  //Movement towards target
  move(speed,target){

  }

  hitTest(hitableObjects,){

  }
}



function enemiesSpawn() {

  var blobl = new Enemy(4,4,4,0x99C24D, "blobl");
  blobl.mesh.position.x += -150;
  blobl.mesh.position.z += -150;
  blobl.mesh.position.y += 10;
  blobl.mesh.scale.set(2,2,2);

  scene.add(blobl.mesh);

}
