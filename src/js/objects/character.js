
 const CharColors = {
  mainColor: 0x0a2444,
  outlinerColor: 0xd90368
 }

 const speedRot = 0.03;


class Bodypart {
  constructor(width, height, depth, color, name) {

    this.object  = new THREE.Object3D();

    this.geom = new THREE.BoxGeometry(width, depth, height, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({color, flatShading: true});

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.outlinerMat = new THREE.MeshBasicMaterial({ color: CharColors.outlinerColor, side: THREE.BackSide })
    this.outliner = new THREE.Mesh(this.geom, this.outlinerMat);

    this.outliner.scale.multiplyScalar(1.1);

    this.object.add(this.mesh);
    this.object.add(this.outliner);

    this.name = name;

  }
}

class Leg extends Bodypart {
  constructor(width, height, depth, color, name) {

    super(width, height, depth, color, name);

    this.mesh.geometry.translate( 0, 0, -1);
    this.mesh.position.z = -2;
    this.outliner.position.z = 2.7;
    this.mesh.position.x = this.name == "leftLeg" ? -0.9 : 0.9;

    this.outliner.position.set(this.mesh.position.x,this.mesh.position.y,this.mesh.position.z);

    this.object.rotation.x = this.name == "rightLeg" ? 0.8 : -0.8;

    this.standTween = TweenMax.to(this.object.rotation, 0.4, {
      x: 0,
      ease: Power0.easeInOut
    })

    if(this.name == "leftLeg")
     {
       this.tween = TweenMax.to(this.object.rotation, 0.4, {
                       x : 0.8,
                       ease: Power0.easeInOut,
                       repeat : -1,
                       yoyo: true
                     })
     } else {
      this.tween = TweenMax.to(this.object.rotation, 0.4, {
                       x : -0.8,
                       ease: Power0.easeInOut,
                       repeat : -1,
                       yoyo: true
                     })
     }
  }

  move(){



  }
}

class Arm extends Bodypart {
  constructor(width, height, depth, color, name) {

    super(width, height, depth, color, name);

    this.mesh.geometry.translate(0,0,-1.2);
    this.mesh.position.z = 0.6;
    this.mesh.position.x = this.name == "leftArm" ? -2.4 : 2.4;

    this.outliner.position.set(this.mesh.position.x,this.mesh.position.y,this.mesh.position.z);

    this.object.rotation.x = this.name == "rightArm" ? -1 : 1;


    this.standTween = TweenMax.to(this.object.rotation, 0.4, {
      x: 0,
      ease: Power0.easeInOut
    })

    if(this.name == "rightArm")
     {
       this.tween =  TweenMax.to(this.object.rotation, 0.4, {
                       x : 1,
                       ease: Power0.easeInOut,
                       repeat : -1,
                       yoyo: true
                     })
     } else {
        this.tween =  TweenMax.to(this.object.rotation, 0.4, {
                       x : -1,
                       ease: Power0.easeInOut,
                       repeat : -1,
                       yoyo: true
                     })
     }

  }

  move(){

    this.tween;
  }
}

class Head extends Bodypart {
  constructor(width, height, depth, color, name) {

    super(width, height, depth, color, name);

    this.mesh.position.z = 4.0;

    this.outliner.position.set(this.mesh.position.x,this.mesh.position.y,this.mesh.position.z);
    this.rightEye = new Bodypart(0.8,0.8,0.8,0xFFFFFF, "rightEye");
    this.rightEye.mesh.position.x += 1;
    this.rightEye.mesh.position.y -= 2.3;
    this.rightEye.mesh.position.z += 0.8;

    this.mesh.add(this.rightEye.mesh);

    this.leftEye = new Bodypart(0.8,0.8,0.8,0xFFFFFFF, "leftEye");
    this.leftEye.mesh.position.x += -1;
    this.leftEye.mesh.position.y -= 2.3;
    this.leftEye.mesh.position.z += 0.8;

    this.mesh.add(this.leftEye.mesh);


    this.mvt = "up";
    this.headMvt = 0.025;

  }

  move(){
    TweenMax.to(this.outliner.position, 0.2, {
      z : 4.5,
      repeat : -1,
      yoyo: true
    })

    TweenMax.to(this.mesh.position, 0.2, {
      z : 4.5,
      repeat : -1,
      yoyo: true
    })


  }
}


// Body Class

class Body extends Bodypart {
  constructor(width, height, depth, color, name) {

    super(width, height, depth, color, name);

    this.mvt = false;
    this.movable = [];

    this.object.rotation.set(-Math.PI/2,0,0) ;


    // Head
    this.head = new Head(4.8, 4.8, 4.8, CharColors.mainColor, "head");

    this.object.add( this.head.mesh );
    this.object.add( this.head.outliner );

    //this.movable.push(this.head);

    // Legs
    this.leftLeg = new Leg(1.6, 1, 1.8, CharColors.mainColor, "leftLeg" );
    this.rightLeg = new Leg(1.6, 1, 1.8, CharColors.mainColor, "rightLeg" );

    this.object.add( this.leftLeg.object );
    this.object.add( this.rightLeg.object );

    this.movable.push(this.leftLeg,this.rightLeg);

    // Arms
    this.leftArm = new Arm(0.8, 2.4, 1, CharColors.mainColor, "leftArm" );
    this.rightArm = new Arm(0.8, 2.4, 1, CharColors.mainColor, "rightArm" );

    this.object.add( this.leftArm.object );
    this.object.add( this.rightArm.object );

    this.movable.push(this.leftArm,this.rightArm);

  }

  move(){
    this.movable.forEach(function(part){
      part.move();
    })
  }
}

/*
* Character Class
*   - Body
*   - Name
*/

class Char {

  constructor(name){
    this.mesh = new THREE.Object3D();
    this.mesh.name = "character";
    this.name = name;

    this.state = "still";
    this.mvt = "false";

    this.body = new Body( 4,  4 , 2.8, CharColors.mainColor);


   /* this.body.mesh.rotation.x = Math.PI/2;
    this.body.mesh.rotation.y = Math.PI/2;*/

    this.mesh.add( this.body.object );
    this.bulletFactory = new BulletFactory();

  }



  move(){
    if( Player.isLeftClick || this.body.mvt )
    {
      var diffX = Player.targetPos.x - this.mesh.position.x;
      var diffY = Player.targetPos.y - this.mesh.position.y;

      var theta = Math.atan2(diffY, diffX);

      var mvtX = Math.cos(theta);
      var mvtY = Math.sin(theta);

      this.mesh.position.x += mvtX*2;
      this.mesh.position.y += mvtY*2;

      if( Math.ceil(Player.targetPos.x/10) == Math.ceil(this.mesh.position.x/10)
      && Math.ceil(Player.targetPos.y/10) == Math.ceil(this.mesh.position.y/10))
      {

        Heroes.standart.action = "stand";
        this.body.mvt = false;
      } else {
        Heroes.standart.action = "move";
        this.body.mvt = true;
      }
    }

    var lookAtPoint = new THREE.Vector3(mouseProjectPos.x,mouseProjectPos.y,12);

    this.mesh.up = new THREE.Vector3(0,0,1);
    this.mesh.lookAt(lookAtPoint);
  }
}


function animateCharacter(Hero){

  switch(Hero.action){
    case "stand" :
        Hero.char.body.movable.forEach(function(part){
          part.tween.pause();
        })
      break;

    case "move" :
        Hero.char.body.movable.forEach(function(part){
          part.tween.play();
        })
      break;
  }

}
