class Map {
  constructor(mapUsed){
    this.mesh = new THREE.Object3D();
    this.map = mapUsed;
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

            mapTiles.push(c);
          }

      }
    }
  }
}

let board;
let mapTiles = [];

function createBoardGame(map){
  board = new Map(map);

  //board.mesh.rotation.y = Math.PI/4;
  /*board.mesh.translateX(-16*(board.tileSize*1.05));*/
  board.mesh.translateY(-10*(board.tileSize*1.05));
  board.mesh.rotation.z = Math.PI / 4;
  board.mesh.position.z = -10;
  board.mesh.updateMatrixWorld();

  scene.add(board.mesh);
}
