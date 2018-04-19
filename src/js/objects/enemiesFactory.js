class Enemy {
  constructor(width, height, depth, color, name) {

    this.geom = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({color, flatShading: true});

    this.texture = new THREE.TextureLoader().load( './src/img/crate.jpg' );
    this.material = new THREE.MeshBasicMaterial( { map: this.texture } );

    this.mesh = new THREE.Mesh(this.geom, this.texture);
    //this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.name = name;
    this.collison = false;
    this.objectInCollision = null;
    this.mvt = true;

  }

  update(){

    if(this.collision) this.hitAction(this.objectInColllision);

    if(this.mvt) this.move();
  }
  //Animation of movement and attack
  animation(){
    console.log("yeah");
    
  }

  //Movement towards target
  move(speed,target){


    /*var diffX = 0 - this.mesh.position.x;
    var diffY = 0 - this.mesh.position.y;

    var theta = Math.atan2(diffY, diffX);

    var mvtX = Math.cos(theta);
    var mvtY = Math.sin(theta);

    this.mesh.position.x += mvtX*1;
    this.mesh.position.y += mvtY*1;

    if( Math.ceil(Player.targetPos.x/10) == Math.ceil(this.mesh.position.x/10)
    && Math.ceil(Player.targetPos.y/10) == Math.ceil(this.mesh.position.y/10))
    {

      this.mvt = false;
    } else {
      this.mvt = true;
    }
*/

  }

  hitAction(hitableObjects){

    this.mvt = false;
    
  }
}

class SimpleEnemy extends Enemy {
  constructor(width, height, depth, color, name){
    super(width, height, depth, color, name);
  }

  animation(){
    TweenMax.to(this.mesh.position, 0.4,
    {
        z:16,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.to(this.mesh.scale, 0.4,
    {
        z: 2.1,
        y: 1.9,
        x: 1.9,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.fromTo(this.mesh.rotation, 0.4,
    {
        x: 0.1,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    },
    {
        x: -0.1,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });
  }
}

class BigEnemy extends Enemy {
  constructor(width, height, depth, color, name){
    super(width, height, depth, color, name);
  }

  animation(){
    TweenMax.to(this.mesh.position, 0.6,
    {
        z:22,
        ease: Power3.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.fromTo(this.mesh.scale, 0.6,
    {
        z: 1.6,
        y: 2.1,
        x: 2.1,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    },
    {
        z: 2.1,
        y: 1.9,
        x: 1.9,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

  }
}

class ShootingEnemy extends Enemy {
  constructor(width, height, depth, color, name){
    super(width, height, depth, color, name);
  }

  animation(){
    TweenMax.to(this.mesh.position, 0.5,
    {
        z:22,
        ease: Power3.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.from(this.mesh.scale, 0.5,
    {
        z: 1,
        y: 2.2,
        x: 2.2,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.to(this.mesh.rotation, 0.5,
    {
        x: 0.1,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

  }
}

function removeSelf(){
  console.log("remove");
  /*scene.remove(obj.mesh);
    let index = Game.enemies.indexOf(obj);


    if (index >= 0)
    {
      Game.enemies.splice(index,1);
    }
    enemiesCollision.removeBody(obj);

    obj.collision = false;
    obj.objectInColllision = null;*/
}

var blobl, bigBlobl, shootingBlobl;

function enemiesSpawn() {

  blobl = new SimpleEnemy(4,4,4,0x99C24D, "blobl");
  blobl.mesh.position.x += 20;
  blobl.mesh.position.z += 10;
  blobl.mesh.scale.set(2,2,2);

  console.log(blobl.mesh);

  scene.add(blobl.mesh);
  Game.enemies.push(blobl);
  enemiesCollision.addBody(blobl);
  //Game.collidableMesh.push(blobl.mesh);

  bigBlobl = new BigEnemy(8,8,8,0x99C24D, "bigBlobl");
  bigBlobl.mesh.position.x += 45;
  bigBlobl.mesh.position.z += 16;
  bigBlobl.mesh.scale.set(2,2,2);

  scene.add(bigBlobl.mesh);

  shootingBlobl = new ShootingEnemy(4,4,10,0x99C24D, "shootingBlobl");
  shootingBlobl.mesh.position.z += 16;
  shootingBlobl.mesh.scale.set(2,2,2);

  scene.add(shootingBlobl.mesh);

}
