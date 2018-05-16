class WaeponPart {
  constructor(width, height, depth, color) {

    this.object  = new THREE.Object3D();

    this.geom = new THREE.BoxGeometry(width, depth, height, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({color, flatShading: true});

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    // this.outlinerMat = new THREE.MeshBasicMaterial({ color: CharColors.outlinerColor, side: THREE.BackSide })
    // this.outliner = new THREE.Mesh(this.geom, this.outlinerMat);
    //
    // this.outliner.scale.multiplyScalar(1.1);

    this.object.add(this.mesh);
    //this.object.add(this.outliner);

  }
}


class Waepon {
  constructor(){
    this.mesh = new THREE.Object3D();
    this.mesh.name = 'weapon';

  }

  model(){
  }


}

export class TwinsGun extends Waepon {
  constructor(){
    super()

    this.baril = new WaeponPart(6,2,2, 0xa3a3a2);
    this.mesh.add(this.baril.object);

    this.cross = new WaeponPart(1.7,4,1.9, 0xa07646);
    this.cross.object.rotation.set(0,0.7,0);
    this.cross.object.scale.set(0.99,0.99,0.99);
    this.cross.object.position.set(-2.1,0,-1.5);
    this.mesh.add(this.cross.object);

    this.trigger = new WaeponPart(3,1,1,0x212421);
    this.trigger.object.scale.set(0.99,0.99,0.99);
    this.trigger.object.position.set(-1,0,-1.5);
    this.mesh.add(this.trigger.object);

    this.canon = new WaeponPart(1,1,1,0x212421);
    this.canon.object.position.set(3,0,0);
    this.mesh.add(this.canon.object);
  }

  model(){

  }


}
