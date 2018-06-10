import Cube from '../../Utils/cube_cstr';
import Fragment from '../Fragment/fragment_cstr';


export class Drill {
  constructor(game,scene,pos){
    this.object = new THREE.Object3D();
    this.tilePos;

    this.support = new Cube(36,36,3,0xd90368,0x0a2444, "drillSupport");
    this.object.add(this.support.object);

    for (var i = 0; i < 4; i++) {
      let cube = new Cube(5,5,12,0xd90368,0x0a2444, "drillPillar");
      switch (i) {
        case 0:
          cube.object.position.set(18,18,-3);
          break;
        case 1:
          cube.object.position.set(18,-18,-3);
          break;
        case 2:
          cube.object.position.set(-18,18,-3);
          break;
        case 3:
          cube.object.position.set(-18,-18,-3);
          break;
        default:
          break;
      }


      this.object.add(cube.object);

    }

    this.main = new Cube(10,10,30,0x0a2444, 0xd90368, "drillMain");
    this.object.add(this.main.object);

    this.life = 20;
    game.screenInfo.drill_lifes = this.life;
    this.diff = 30/(120*60);

    this.object.position.set(pos.x , pos.y ,10);

    game.threeContainer.add(this.object);
    game.collisionEngine.addBody(this ,"drill");

    setInterval( e => this.popCrystal(scene, game) , 10000);

  }

  update(game,scene){

    game.collisionEngine.testCollision("drill", "enemies");

    if(this.collision) {
      this.life--;
      game.screenInfo.drill_lifes--;
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

    let rdm = Math.floor(Math.random() * game.map.popTiles.length);
    let vector = new THREE.Vector3();
    vector.setFromMatrixPosition( game.map.popTiles[rdm].mesh.matrixWorld );

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
