
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
    //this.mesh.receiveShadow = true;
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

    this.mvt = this.name == "leftLeg" ? "backward" : "forward";
    this.rot = this.name == "leftLeg" ? -speedRot : speedRot;

    

  }

  move(){

    if(this.object.rotation.x > 0.3 && this.mvt == "forward")
    {
      this.rot = -speedRot;
      this.mvt ="backward"
    } else if(this.object.rotation.x < -0.3 && this.mvt == "backward")
    {
      this.rot = speedRot;
      this.mvt ="forward"
    }

    this.object.rotation.x += this.rot;
  }
}

class Arm extends Bodypart {
  constructor(width, height, depth, color, name) {

      super(width, height, depth, color, name);

      this.mesh.geometry.translate(0,0,-1.2);
      this.mesh.position.z = 0.6;
      this.mesh.position.x = this.name == "leftArm" ? -2.4 : 2.4;

      this.outliner.position.set(this.mesh.position.x,this.mesh.position.y,this.mesh.position.z);

      this.mvt = this.name == "rightArm" ? "backward" : "forward";
      this.rot = this.name == "rightArm" ? -speedRot : speedRot;
      
  }

  move(){

    if(this.object.rotation.x > 0.3 && this.mvt == "forward")
    {
      this.rot = -speedRot;

      this.mvt ="backward"
    } else if(this.object.rotation.x < -0.3 && this.mvt == "backward")
    {
      this.rot = speedRot;
      this.mvt ="forward"
    }

    this.object.rotation.x += this.rot;



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
    if(this.object.position.z > 4.1 && this.mvt == "up")
    {
      this.headMvt = -0.025;
      this.mvt ="down";
    } else if(this.object.position.z < 3.8 && this.mvt == "down")
    {
      this.headMvt = 0.025;
      this.mvt ="up";
    }

    this.object.position.z += this.headMvt;

    
   
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

    this.movable.push(this.head);

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

  update(){

  }

  move(){

    this.head.move();

    for (var i = 0; i < this.movable.length; i++) {

         this.movable[i].move();
    }

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
    this.body.move();
  

    if( Player.isLeftClick || this.body.mvt )
    {
      var diffX = Player.targetPos.x - this.mesh.position.x;
      var diffY = Player.targetPos.y - this.mesh.position.y;

      var theta = Math.atan2(diffY, diffX);

      var mvtX = Math.cos(theta);
      var mvtY = Math.sin(theta);

      this.mesh.position.x += mvtX*1;
      this.mesh.position.y += mvtY*1;

      if( Math.ceil(Player.targetPos.x/10) == Math.ceil(this.mesh.position.x/10)
      && Math.ceil(Player.targetPos.y/10) == Math.ceil(this.mesh.position.y/10))
      {

        this.body.mvt = false;
      } else {
        this.body.mvt = true;
      }
    }

    var lookAtPoint = new THREE.Vector3(mouseProjectPos.x,mouseProjectPos.y,12);

    this.mesh.up = new THREE.Vector3(0,0,1);
    this.mesh.lookAt(lookAtPoint);



  }
}


var char;

function createCharacter(){
  char = new Char();

  char.body.mesh.geometry.center();
  char.mesh.position.z = 12;

  char.mesh.scale.set(1.5,1.5,1.5);

  scene.add(char.mesh);

}

function animateCharacter(body){

  char.move();

}
