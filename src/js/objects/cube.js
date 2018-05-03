class Cube {
  constructor(width, height, depth, color){
    this.name = name;

    this.object  = new THREE.Object3D();

    this.geom = new THREE.BoxGeometry(width, height, depth, 2, 2, 2);
    this.mat = new THREE.MeshPhongMaterial({color, flatShading: true});

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;


    this.object.add(this.mesh);
  }
}

class OutlinerCube extends Cube {
  constructor(width, height, depth, color){
    super(width, height, depth, color)

    this.outlinerMat = new THREE.MeshBasicMaterial({ color: 0x30323d , side: THREE.BackSide })
    this.outliner = new THREE.Mesh(this.geom, this.outlinerMat);

    this.outliner.scale.multiplyScalar(1.1);
    this.object.add(this.outliner);

  }
}
