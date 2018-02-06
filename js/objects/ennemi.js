class Enemy {
  constructor(width, height, depth, color, name) {
    this.geom = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({color, shading:THREE.FlatShading});

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    //this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.name = name;
  }
}

class Blobl extends Enemy {
  constructor(width, height, depth, color, name) {
    super(width, height, depth, color, name)

  }

  move(){

  }
}

createEnemy(){
  
}
