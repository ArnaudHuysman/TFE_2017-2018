class GunPart {
  constructor(width, height, depth, color, name) {

    this.object  = new THREE.Object3D();

    this.geom = new THREE.BoxGeometry(width, depth, height, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({color, flatShading: true});

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.outlinerMat = new THREE.MeshBasicMaterial({ color: CharColors.outlinerColor, side: THREE.BackSide })
    this.outliner = new THREE.Mesh(this.geom, this.outlinerMat);

    this.outliner.scale.multiplyScalar(1.1);

    this.object.add(this.mesh);
    this.object.add(this.outliner);

    this.name = name;

  }
}
