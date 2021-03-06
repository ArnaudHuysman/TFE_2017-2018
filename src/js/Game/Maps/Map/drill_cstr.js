import Cube from '../../Utils/cube_cstr';
import Fragment from '../Fragment/fragment_cstr';

import gsap from 'gsap';
var TweenMax = gsap.TweenMax;

export class Drill_Cstr {
  constructor(){
    this.object = new THREE.Object3D();

    // this.main = new Cube(10,10,30,0x0a2444, 0xd90368, "drillMain");
    // this.object.add(this.main.object);
    for (var i = 0; i < 15; i++) {
      let size = 1.5*i + Math.random();
      let depth = 4+ Math.random() ;
      let cube = new Cube(size,size,depth,0x0a2444, 0xd90368, "drillMain");
      cube.object.position.z += i*4;
      cube.object.rotation.z += i;
      this.object.add(cube.object);
    }

  }


}

export class Drill {
  constructor(game,scene,pos, total){
    this.drill_cstr = new Drill_Cstr();
    this.tilePos;


    this.life = 10;
    game.screenInfo.drill_lifes = this.life;
    this.diff = 30/total;

    this.drill_cstr.object.position.set(pos.x , pos.y , -20);

    game.threeContainer.add(this.drill_cstr.object);
    game.collisionEngine.addBody(this.drill_cstr ,"drill");

    this.lifebar = new Cube( 35, 5, 5 , 0xFAFF00, 0x3A3A3A, "drill_lifebar");

    this.lifebar.object.position.z += 55;

    scene.add(this.lifebar.object)

    this.interval = 0;
    this.nextFragment = 10000;
    this.totalTime = total;
    this.limit = -(15*4.5)+20;

  }

  update(game,scene,time,dt){

    game.collisionEngine.testCollision("drill", "enemies");

    let lifebarHeight = 1/10*this.life;
    this.lifebar.innerCube.mesh.scale.set(lifebarHeight,1,1);

    this.interval += dt;

    if(this.interval > this.nextFragment ){
      this.popCrystal(scene, game);
      let rdm = Math.random()*(20000-12000)+12000;

      this.interval = 0;
      this.nextFragment = rdm;
    }

    if(this.drill_cstr.collision) {
      this.drill_cstr.collision = false;
      this.drill_cstr.objectInCollision = null;
      this.colideAction(game);
    }

    if(this.drill_cstr.object.position.z > this.limit) {
      this.animate(dt);
    }
  }

  animate(dt){

    this.drill_cstr.object.rotation.z += dt/1000;
    //this.drill_cstr.object.position.z -= dt/(this.totalTime*100);

  }

  colideAction(game){


  }

  popCrystal(scene, game){


    let frgmt = new Fragment(scene, game.map.info.colors.ressource);

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
                     ease: Power2.easeInOut,
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
