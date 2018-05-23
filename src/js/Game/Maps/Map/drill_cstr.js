import {Bodypart} from '../../Heroes/char_cstr';
import {GameObjects} from '../../Utils/utils';
import Fragment from '../Fragment/fragment_cstr';
class DrillPart extends Bodypart {
  constructor(width, height, depth, color, name){
    super(width, height, depth, color, name)
  }
}

export class Drill {
  constructor(game,scene,gameTime){
    this.object  = new THREE.Object3D();

    this.support = new DrillPart(20,5,20,0xd90368,"support");
    this.object.add(this.support.mesh);

    this.main = new DrillPart(5,30,5,0x0a2444,"main");
    this.main.mesh.position.set(0,0,5);
    this.object.add(this.main.mesh);

    this.life = 20;
    this.diff = 30/(gameTime*60);

    let tile = game.map.mapTiles.filter(tile => tile.tileType === "drill");

    console.log(tile[0]);
    this.object.position.set(tile[0].position.x , tile[0].position.y ,5);


    game.threeContainer.add(this.object);
    GameObjects.collidableMesh.push(this.support);

    setInterval( e => this.popCrystal(scene, game) , 3000);

  }

  update(){
    if(this.life <= 0 ) {
      console.log("Defeat");
    }
    if(this.main.mesh.position.z > -10) {
      this.animate();
    }
  }

  animate(){

    this.main.mesh.rotation.z += 0.05;
    this.main.mesh.position.z -= this.diff;

  }

  popCrystal(scene, game){


    let frgmt = new Fragment(scene);

    let rdm = Math.floor(Math.random() * game.map.mapTiles.length);
    let vector = new THREE.Vector3();
    vector.setFromMatrixPosition( game.map.mapTiles[rdm].matrixWorld );

    var diffX = vector.x - 0;
    var diffY = vector.y - 0;

    var theta = Math.atan2(diffY, diffX);

    var mvtX = Math.cos(theta);
    var mvtY = Math.sin(theta);


    var a = 0 - vector.x;
    var b = 0 - vector.y;

    var c = Math.sqrt( a*a + b*b );

    let dist = c/2;


    TweenMax.to(frgmt.object.position, 0.4, {
                     x : mvtX*dist,
                     y : mvtY*dist,
                     z : dist/2,
                     ease: Power0.easeInOut,
                     onComplete : function() {TweenMax.to(frgmt.object.position, 0.4, {
                       x : frgmt.object.position.x+mvtX*dist,
                       y : frgmt.object.position.y+mvtY*dist,
                       z : 10,
                       ease: Power0.easeInOut
                     })}
                  })
  }
}
