import {Drill} from './drill_cstr';
import Cube from '../../Utils/cube_cstr';
export default class Map {
  constructor(game,mapUsed,scene){
    this.mesh = new THREE.Object3D();
    this.map = mapUsed;
    this.matrix = this.map.structure;
    this.mapTiles = [];
    this.spawTiles = [];
    this.tileSize = 24;
    this.size = (24*1.05)*20;
    var geom = new THREE.BoxBufferGeometry(this.tileSize,this.tileSize,this.tileSize);
    var mat = new THREE.MeshBasicMaterial({color: 0x104F55});
    var basciMat = new THREE.MeshToonMaterial( {
						bumpScale: 1,
						color: 0x104F55,
						specular: 0x9EC5AB,
						shininess: 10,
            reflectivity: 0
		});

    var drillMat = new THREE.MeshToonMaterial( {
						bumpScale: 1,
						color: 0x16D4F0,
						specular: 0x9EC5AB,
						shininess: 40,
            reflectivity: 1
		});


    var tampon = 0;
    var tampon2 = 0;

    let drillPos, drillTilePos;
    let drillTile = false;

    for(var i=0; i<this.map.structure.length; i++){
      if(i <= 10) tampon++; else tampon--;
      for( var j=0; j<this.map.structure[i].length; j++){
          let c;
          if(j <= 10) tampon2++; else tampon2--;
          switch (this.map.structure[i][j]) {
            case 1:
              break;
            case 0:
              c = new THREE.Mesh(geom,mat);
              c.arrayPos = [j,i];
              break;

            case 2:
              c = new THREE.Mesh(geom,mat);
              c.arrayPos = [j,i];
              break;
            case 3:
              c = new THREE.Mesh(geom,mat);
              c.arrayPos = [j,i];
              c.tileType = "drill";
              drillTile = true;
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

            if(drillTile) {
              drillPos = c.position;
              drillTilePos = c.arrayPos;
              drillTile = false;
            }

            this.mapTiles.push(c);

            if ( i < 2 || i > 18 || j < 2 || j > 18 ) this.spawTiles.push(c);

            let tuiles = Math.floor(Math.random()*(tampon*tampon2/15));

            for (var k = 0; k < tuiles; k++) {
              let t = new THREE.Mesh(geom,basciMat);
              t.position.x = i*(this.tileSize*1.05);
              t.position.y = j*(this.tileSize*1.05);
              t.position.z = -k*(this.tileSize*1.05);
              this.mesh.add(t);

            }
          }
      }
    }

    this.mesh.position.z = -10;

    this.drill = new Drill(game,scene,drillPos);
    this.drill.tilePos = drillTilePos;

    game.threeContainer.add(this.mesh);

  }
}
