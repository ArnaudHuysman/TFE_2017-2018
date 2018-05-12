export default class Map {
  constructor(mapUsed,scene){
    this.mesh = new THREE.Object3D();
    this.map = mapUsed;
    this.mapTiles = [];
    this.tileSize = 24;
    var geom = new THREE.BoxBufferGeometry(this.tileSize,this.tileSize,this.tileSize);

    var tampon= 0;
    var tampon2 =0;

    for(var i=0; i<this.map.structure.length; i++){
      for( var j=0; j<this.map.structure[i].length; j++){
          let c;
          switch (this.map.structure[i][j]) {
            case 0:
              break;
            case 1:
              c = new THREE.Mesh(geom,new THREE.MeshPhongMaterial( { color: 0x5f5f5f, flatShading: true }));
              break;
            case 2:
              c = new THREE.Mesh(geom,new THREE.MeshPhongMaterial( { color: 0x3243F6, flatShading: true }));
              break;
            default:

          }

          if(c !== undefined){
            c.position.x = i*(this.tileSize*1.05);
            c.position.y = j*(this.tileSize*1.05);
            c.position.z = 0;

            c.castShadow = true;
            c.receiveShadow = true;
            this.mesh.add(c);

            this.mapTiles.push(c);
          }

      }
    }

    this.mesh.translateY(-10*(this.tileSize*1.05));
    this.mesh.rotation.z = Math.PI / 4;
    this.mesh.position.z = -10;
    this.mesh.updateMatrixWorld();

    scene.add(this.mesh);

  }
}
