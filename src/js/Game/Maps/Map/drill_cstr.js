import Cube from '../../Utils/cube_cstr';
import Fragment from '../Fragment/fragment_cstr';


export class Drill {
  constructor(game,scene,pos){
    this.object = new THREE.Object3D();
    this.tilePos;

    this.support = new Cube(20,20,5,0xd90368,0x0a2444, "drillSupport");
    this.object.add(this.support.object);

    this.main = new Cube(5,5,30,0x0a2444, 0xd90368, "drillMain");
    this.object.add(this.main.object);

    this.life = 20;
    this.diff = 30/(120*60);

    this.object.position.set(pos.x , pos.y ,5);

    game.threeContainer.add(this.object);
    game.collisionEngine.addBody(this ,"drill");

    //setInterval( e => this.popCrystal(scene, game) , 10000);

  }

  update(scene){
    if(this.life <= 0 ) {
      console.log("Defeat");
    }

    game.collisionEngine.testCollision("drill", "enemies");

    if(this.collision) {
      this.life--;
      this.collision = false;
      this.objectInCollision = null;
    }

    if(this.main.object.position.z > -10) {
      this.animate();
    }
  }

  animate(){

    this.main.object.rotation.z += 0.05;
    this.main.object.position.z -= this.diff;

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
                       ease: Power0.easeInOut,
                       onComplete : function() { game.collisionEngine.addBody(frgmt, "fragment") }
                     })}
                  })
  }
}
