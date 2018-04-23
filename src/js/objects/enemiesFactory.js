class Enemy {
  constructor(width, height, depth, color, name) {

    this.object  = new THREE.Object3D();

    this.geom = new THREE.BoxGeometry(width, height, depth, 2, 2, 2);
    this.mat = new THREE.MeshPhongMaterial({color, flatShading: true});

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.outlinerMat = new THREE.MeshBasicMaterial({ color: 0x30323d , side: THREE.BackSide })
    this.outliner = new THREE.Mesh(this.geom, this.outlinerMat);

    this.outliner.scale.multiplyScalar(1.1);

    this.object.add(this.mesh);
    this.object.add(this.outliner);

    this.name = name;
    this.collison = false;
    this.objectInCollision = null;
    this.mvt = true;

  }

  update(){

    if(this.collision) {
 
        removeSelf(this);
        //this.hitAction(this.objectInColllision);
    };
  }
  //Animation of movement and attack
  animation(){

    
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
    TweenMax.to(this.object.position, 0.4,
    {
        z:16,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.to(this.object.scale, 0.4,
    {
        z: 3.1,
        y: 2.9,
        x: 2.9,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.fromTo(this.object.rotation, 0.4,
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

  update(){

    if(this.collision) {
        console.log("hit"); 
        removeSelf(this);

        for (var i = 0; i < 180; i+=45) {
          console.log(Math.cos(i), Math.sin(i));

          var newEnemi = EnemiFactory(0);
          newEnemi.object.scale.set(3,3,3);
          newEnemi.object.position.z = 10;
          newEnemi.object.position.x = this.object.position.x + Math.cos(i)*25;
          newEnemi.object.position.y = this.object.position.y + Math.sin(i)*25;

          Game.enemies.push(newEnemi);
          enemiesCollision.addBody(newEnemi);
          scene.add(newEnemi.object);
        }
        //this.hitAction(this.objectInColllision);
    };
  }

  animation(){
    TweenMax.to(this.object.position, 0.6,
    {
        z:22,
        ease: Power3.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.fromTo(this.object.scale, 0.6,
    {
        z: 2.6,
        y: 3.1,
        x: 3.1,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    },
    {
        z: 3.1,
        y: 2.9,
        x: 2.9,
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
    TweenMax.to(this.object.position, 0.5,
    {
        z:22,
        ease: Power3.easeOut,
        repeat: -1,
        yoyo:true,
    });
    TweenMax.from(this.object.scale, 0.5,
    {
        z: 1,
        y: 3.2,
        x: 3.2,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.to(this.object.rotation, 0.5,
    {
        x: 0.1,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

  }

  update(){
    
    var diffX = char.mesh.position.x - this.object.position.x;
    var diffY = char.mesh.position.y - this.object.position.y;

    if(Math.abs(diffY) < 100 && Math.abs(diffX) < 100) {
      this.mvt = false;
    } else {
      this.mvt = true; 
    }

    var theta = Math.atan2(diffY, diffX);

    super.update();
    if(this.mvt) this.move(theta);
  }
  move(theta){

    var mvtX = Math.cos(theta);
    var mvtY = Math.sin(theta);

    this.object.position.x += mvtX*0.5;
    this.object.position.y += mvtY*0.5;

    /*if( Math.ceil(Player.targetPos.x/10) == Math.ceil(this.object.position.x/10)
    && Math.ceil(Player.targetPos.y/10) == Math.ceil(this.object.position.y/10))
    {
      this.mvt = false;
    } else {
      this.mvt = true;
    }*/


  }
}

var  score = document.querySelector(".score");
var scoreText;
function removeSelf(obj){

  Player.score++;
  scoreText = "Score : " + Player.score;
  score.innerText = scoreText;

  scene.remove(obj.object);

  let index = Game.enemies.indexOf(obj);
  if (index >= 0)
  {
    Game.enemies.splice(index,1);
  }
  enemiesCollision.removeBody(obj);

  obj.collision = false;
  obj.objectInColllision = null;
}


function EnemiFactory(rdm) {
    var enemi ;

    switch(rdm) {
      case 0 :
          enemi = new SimpleEnemy(4,4,4,0x8ac926, "blobl");
          break;

      case 1:
          enemi = new BigEnemy(8,8,8,0x4c6e15, "bigBlobl");
          break;

      case 2:
          enemi = new ShootingEnemy(4,4,10,0x56445d, "shootingBlobl");
          break;
    }


    //Move vertices 
    /*for (var i = 0; i < 9; i++) {
      enemi.geom.vertices[i].z = 5;
    }
  */
    return enemi;
} 


function enemiesSpawn() {

    var enemi = EnemiFactory(Math.floor(Math.random()*2)+1);

    var rdm = Math.floor(Math.random() * mapTiles.length);

    var vector = new THREE.Vector3();
    vector.setFromMatrixPosition( mapTiles[rdm].matrixWorld );

    enemi.object.scale.set(3,3,3);
    enemi.object.position.z = 10;
    enemi.object.position.x = vector.x;
    enemi.object.position.y = vector.y;

    enemi.animation();  
    
    Game.enemies.push(enemi);
    enemiesCollision.addBody(enemi);
    scene.add(enemi.object);


}
