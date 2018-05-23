import {GameObjects} from '../../Utils/utils';

export default class Fragment {
  constructor(scene){
    this.object = new THREE.Object3D();
    this.size = 8;

    this.build()

    scene.add(this.object);
    GameObjects.collidableMesh.push(this);
  }

  build(){
    let geom = new THREE.BoxGeometry(this.size,this.size,this.size);
    let mat = new THREE.MeshPhongMaterial({
		  color:0x003785,
	  });
    let outlinerMat = new THREE.MeshBasicMaterial({ color:0x249FF0, side: THREE.BackSide })

    let simpleGeometry = new THREE.Geometry();

    let m = new THREE.Mesh(geom);
    m.rotation.z = Math.random()*Math.PI*2;
    m.rotation.y = Math.random()*Math.PI*2;
    m.updateMatrix();
    simpleGeometry.merge(m.geometry, m.matrix)

    let nCubes = 4;

    for (var i = 0; i < nCubes; i++) {
      let m = new THREE.Mesh(geom);

      m.position.x = Math.floor(Math.random()*this.size)-this.size/2;
  		m.position.y = Math.floor(Math.random()*this.size)-this.size/2;
  		m.position.z = Math.floor(Math.random()*this.size)-this.size/2;
  		m.rotation.z = Math.random()*Math.PI*2;
  		m.rotation.y = Math.random()*Math.PI*2;

      var s = .4 + Math.random()*.4;
  		m.scale.set(s,s,s);

  		m.castShadow = true;
  		m.receiveShadow = true;

      m.updateMatrix()
  		simpleGeometry.merge(m.geometry, m.matrix);
    }

    let combineMesh  = new THREE.Mesh(simpleGeometry, mat);
    let combineOutliner = new THREE.Mesh(combineMesh.geometry, outlinerMat);

    combineOutliner.scale.multiplyScalar(1.1);

    this.object.add(combineMesh);
    this.object.add(combineOutliner);
  }
}
