import {GameObjects} from '../../Utils/utils';

export default class Fragment {
  constructor(scene, color){
    this.object = new THREE.Object3D();
    this.size = 8;
    this.color = color;
    this.build();
    this.name = "fragment";

    scene.add(this.object);

  }

  update(){

  }

  build(){
    let geom = new THREE.BoxGeometry(this.size,this.size,this.size);

    let mat = new THREE.MeshToonMaterial( {
						bumpScale: 1,
						color: this.color,
						specular: 0x9EC5AB,
						reflectivity: 1,
						shininess: 40
		});

    let outlinerMat = new THREE.MeshBasicMaterial({ color:0x3A015C, side: THREE.BackSide })

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
