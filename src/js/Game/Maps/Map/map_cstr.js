import {Drill} from './drill_cstr';
import Cube from '../../Utils/cube_cstr';


class MapTile {
  constructor(color, shininess, reflectivity ,size){
    this.geom = new THREE.BoxBufferGeometry(size, size, size);
    this.name = "basic_tile";
    this.mat = new THREE.MeshToonMaterial( {
						bumpScale: 1,
						color: color,
						specular: 0xffffff,
						shininess: shininess,
            reflectivity: reflectivity
		});


    this.mesh = new THREE.Mesh(this.geom, this.mat);

  }
}

class InvisibleTile {
  constructor(size){
    this.name = "empty_tile";
    this.geom = new THREE.BoxBufferGeometry(size, size, size);

    this.mat = new THREE.MeshBasicMaterial( {
						color: 0xffffff,
						transparent : true,
            opacity : 0
		});

    this.mesh = new THREE.Mesh(this.geom, this.mat);

  }
}

export default class Map {
  constructor(game,mapUsed,scene,drill){
    this.mesh = new THREE.Object3D();
    this.info = mapUsed;
    this.matrix = this.info.structure;
    this.colors = this.info.colors;
    this.mapTiles = [];
    this.spawTiles = [];
    this.popTiles = [];
    this.tileSize = 24;
    this.size = (24*1.05)*20;
    var geom = new THREE.BoxBufferGeometry(this.tileSize,this.tileSize,this.tileSize);

    let fallcolor = rgbToHex(this.colors.base.r,this.colors.base.g,this.colors.base.b);

    var basicMat = new THREE.MeshToonMaterial( {
						bumpScale: 1,
						color: fallcolor,
						specular: 0xffffff,
						shininess: 10,
            reflectivity: 0
		});

    const baseColor = this.colors.base;
    const finalColor = this.colors.second;
    var diffR = (baseColor.r-finalColor.r)/(this.info.structure.length/2);
    var diffG = (baseColor.g-finalColor.g)/(this.info.structure.length/2);
    var diffB = (baseColor.b-finalColor.b)/(this.info.structure.length/2);

    let changingColor = {r:0, g:0, b:0};

    var tampon = 0;


    let drillPos, drillTilePos;
    let drillTile = false;

    for(var i=0; i<this.info.structure.length; i++){
      if(i <= 10) tampon++; else tampon--;
      let tampon2 = 0;
      for( var j=0; j<this.info.structure[i].length; j++){
          let c;
          if(j <= 10) tampon2++; else tampon2--;

          changingColor.r = finalColor.r + (tampon2+tampon)*diffR;
          changingColor.r = changingColor.r > 255 ? 255 : changingColor.r < 0  ? 0 : changingColor.r;
          changingColor.g = finalColor.g + (tampon2+tampon)*diffG;
          changingColor.g = changingColor.g > 255 ? 255 : changingColor.g < 0  ? 0 : changingColor.g;
          changingColor.b = finalColor.b + (tampon2+tampon)*diffB;
          changingColor.b = changingColor.b > 255 ? 255 : changingColor.b < 0  ? 0 : changingColor.b;


          let color = rgbToHex(changingColor.r,changingColor.g,changingColor.b);
          //console.log("pos",i, j, "color", changingColor.r,changingColor.g,changingColor.b, color);
          switch (this.info.structure[i][j]) {
            case 1:
              c = new InvisibleTile(this.tileSize);
              c.arrayPos = [j,i];
              break;
            case 0:
              let hexColor = rgbToHex( baseColor.r, baseColor.g, baseColor.b);
              c = new MapTile(color, 10, 0, this.tileSize);
              c.arrayPos = [j,i];
              break;

            case 2:
              c = new MapTile(this.colors.ressource, 40, 1, this.tileSize);
              c.arrayPos = [j,i];
              break;
            case 3:
              c = new InvisibleTile(this.tileSize);
              c.arrayPos = [j,i];
              c.tileType = "drill";
              drillTile = true;
              break;
            default:

          }


          c.mesh.position.x = i*(this.tileSize*1.05);
          c.mesh.position.y = j*(this.tileSize*1.05);
          c.mesh.position.z = 0;
          this.mesh.add(c.mesh);

          if(drillTile) {
            drillPos = c.mesh.position;
            drillTilePos = c.arrayPos;
            drillTile = false;
          }

          this.mapTiles.push(c);

          if( c instanceof MapTile )
          {
            this.popTiles.push(c);
            if ( i < 2 || i > 18 || j < 2 || j > 18 ) this.spawTiles.push(c);

            let tuiles = Math.floor(Math.random()*(tampon/2*tampon2/2));

            for (var k = 0; k < tuiles; k++) {
              let t = new THREE.Mesh(geom,basicMat);
              t.position.x = i*(this.tileSize*1.05);
              t.position.y = j*(this.tileSize*1.05);
              t.position.z = -k*(this.tileSize*1.05);
              this.mesh.add(t);
            }
          }

      }
    }

    this.mesh.position.z = -10;

    if(drill){

      let totalTime = 0;
      let totalWaves =  this.info.waves.length;
      for (var i = 0; i < this.info.waves.length; i++) {
        totalTime += this.info.waves[i].time;
      }
      this.drill = new Drill(game,scene,drillPos, totalWaves);
      this.drill.tilePos = drillTilePos;
    }


    game.threeContainer.add(this.mesh);

  }
}


function componentToHex(c) {
    var hex = Math.floor(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return parseInt("0x" + componentToHex(r) + componentToHex(g) + componentToHex(b));
}
