export default class Cube {
  constructor(width, height, depth, color, outColor, name){
    this.name = name;

    this.object = new THREE.Object3D();

    this.innerCube  = new InnerCube(width, height, depth, color);
    this.object.add(this.innerCube.mesh);

    this.outlinerCube = new OutlinerCube(width, height, depth, outColor);
    this.object.add(this.outlinerCube.mesh);
  }
} 

class InnerCube {
  constructor(width, height, depth, color){
    this.geom = new THREE.BoxGeometry(width, height, depth, 2, 2, 2);
    this.mat = new THREE.MeshToonMaterial( {
						bumpScale: 1,
						color: color,
						specular: 0x9EC5AB,
						reflectivity: 0,
						shininess: 40
		});
    //this.mat = new THREE.MeshBasicMaterial({ color: color , side: THREE.BackSide })
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
  }
}

class OutlinerCube {
  constructor(width, height, depth, color){

    this.geom = new THREE.BoxGeometry(width, height, depth, 2, 2, 2);
    this.mat = new THREE.MeshBasicMaterial({ color: color , side: THREE.BackSide });
    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.mesh.scale.multiplyScalar(1.1);
  }
}
