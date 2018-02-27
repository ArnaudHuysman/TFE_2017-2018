//-------------------------- Board Game -----------------------------//



class BoardGame {
  constructor(){
    this.mesh = new THREE.Object3D();
    this.tileSize = 12;
    this.size = 32;
    var geom = new THREE.BoxGeometry(this.tileSize,this.tileSize,this.tileSize);

    var tampon= 0;
    var tampon2 =0;

    for(var i=0; i<32; i++){
      if(i<16) tampon +=1;
      else tampon -= 1;
      for( var j=0; j<32; j++){
        if(j<16) tampon2 +=1;
        else tampon2 -= 1;
        for (var k = 0; k < 1/*((tampon)*(tampon2)*1.2)/(Math.random()*16)*/; k++) {

          var c = new THREE.Mesh(geom,new THREE.MeshPhongMaterial( { color: 0x5f5f5f, flatShading: true }));
          c.position.x = i*(this.tileSize*1.05);
          c.position.y = j*(this.tileSize*1.05);
          c.position.z = -k*(this.tileSize*1.05);

          c.castShadow = true;
          c.receiveShadow = true;

          this.mesh.add(c);

          mapTiles.push(c);

        }
      }
    }
  }
  
}



var board, mapTiles = [];

function createBoardGame(){
  board = new BoardGame(Colors.blue);
  //board.mesh.rotation.y = Math.PI/4;
  board.mesh.translateX(-16*(board.tileSize*1.05));
  board.mesh.translateY(-16*(board.tileSize*1.05));

  scene.add(board.mesh);
}


// Drill on map's center

var drillingMachine;

class DrillingMachine {
  constructor() {

    this.geom = new THREE.BoxGeometry(24,24,24,1,1,1);
    this.mesh = new THREE.Mesh(this.geom,new THREE.MeshBasicMaterial( { color: 0x18206F, side:THREE.BackSide }));
  
  }
}

function createDrilling(){
  drillingMachine = new DrillingMachine();
  drillingMachine.mesh.position.z += 50;
  scene.add(drillingMachine.mesh);
}
