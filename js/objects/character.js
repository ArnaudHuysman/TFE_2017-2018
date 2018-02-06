


class Bodypart {
  constructor(width, height, depth, color, name) {

    this.geom = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({color, shading:THREE.FlatShading});

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    //this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.name = name;

  }
}

class Leg extends Bodypart {
  constructor(width, height, depth, color, name) {

    super(width, height, depth, color, name);

    this.mesh.geometry.translate( 0, -0.9, 0 );
    this.mesh.position.y = -1.8;
    this.mesh.position.x = this.name == "leftLeg" ? -0.9 : 0.9;

    this.mvt = this.name == "leftLeg" ? "backward" : "forward";
    this.rot = this.name == "leftLeg" ? -0.05 : 0.05;

  }

  move(){

    if(this.mesh.rotation.x > 42 && this.mvt == "forward")
    {
      this.rot = -1;
      this.mvt ="backward"
    } else if(this.mesh.rotation.x < -38 && this.mvt == "backward")
    {
      this.rot = 1;
      this.mvt ="forward"
    }

    this.mesh.rotation.x += this.rot;
  }
}

class Arm extends Bodypart {
  constructor(width, height, depth, color, name) {

      super(width, height, depth, color, name);

      this.mesh.geometry.translate(0,-1.2,0);
      this.mesh.position.y = 1.2;
      this.mesh.position.x = this.name == "leftArm" ? -2.4 : 2.4;

      this.mvt = this.name == "rightArm" ? "backward" : "forward";
      this.rot = this.name == "rightArm" ? -0.5 : 0.5;
  }

  move(){

    if(this.mesh.rotation.x > 42 && this.mvt == "forward")
    {
      this.rot = -0.1;

      this.mvt ="backward"
    } else if(this.mesh.rotation.x < 38 && this.mvt == "backward")
    {
      this.rot = 0.1;
      this.mvt ="forward"
    }

    this.mesh.rotation.x += this.rot;

  }
}

class Head extends Bodypart {
  constructor(width, height, depth, color, name) {

    super(width, height, depth, color, name);

    this.mesh.position.y = 4.0;

    this.rightEye = new Bodypart(0.8,0.8,0.8,0xFFFFFF, "rightEye");
    this.rightEye.mesh.position.z += 2.3;
    this.rightEye.mesh.position.y += 0.8;
    this.rightEye.mesh.position.x += 1.0;

    this.mesh.add(this.rightEye.mesh);

    this.leftEye = new Bodypart(0.8,0.8,0.8,0xFFFFFFF, "leftEye");
    this.leftEye.mesh.position.z += 2.3;
    this.leftEye.mesh.position.y += 0.8;
    this.leftEye.mesh.position.x += -1.0;

    this.mesh.add(this.leftEye.mesh);


    this.mvt = "up";
    this.headMvt = 0.25;

  }

  move(){
    if(this.mesh.position.y > 4.1 && this.mvt == "up")
    {
      this.headMvt = -0.15;
      this.mvt ="down";
    } else if(this.mesh.position.y < 3.9 && this.mvt == "down")
    {
      this.headMvt = 0.15;
      this.mvt ="up";
    }

    this.mesh.position.y += this.headMvt;
  }
}


// Body Class

class Body extends Bodypart {
  constructor(width, height, depth, color, name) {

    super(width, height, depth, color, name);

    this.mvt = false;
    this.movable = [];
    // Head
    this.head = new Head(4.8, 4.8, 4.8, 0xE53D00, "head");

    this.mesh.add( this.head.mesh );
    this.movable.push(this.head);

    // Legs
    this.leftLeg = new Leg(1.6, 1.8, 1.8, 0xE53D00, "leftLeg" );
    this.rightLeg = new Leg(1.6, 1.8, 1.8, 0xE53D00, "rightLeg" );

    this.mesh.add( this.leftLeg.mesh );
    this.mesh.add( this.rightLeg.mesh );

    this.movable.push(this.leftLeg,this.rightLeg);

    // Arms
    this.leftArm = new Arm(0.8, 2.4, 1.2, 0xE53D00, "leftArm" );
    this.rightArm = new Arm(0.8, 2.4, 1.2, 0xE53D00, "rightArm" );

    this.mesh.add( this.leftArm.mesh );
    this.mesh.add( this.rightArm.mesh );

    this.movable.push(this.leftArm,this.rightArm);



  }

  update(){

  }

  move(){


    //
    // for (var i = 0; i < this.movable.length; i++) {
    //   if( this.mvt ) this.movable[i].move();
    //   else this.movable[i].mesh.rotation.x = 0;
    // }
    //




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

    this.body = new Body(3.6, 3, 2.8, 0x21A0A0);
    this.body.mesh.position.y += 10.8;
    this.mesh.add( this.body.mesh );

    this.angle = 0;

    this.bulletFactory = new BulletFactory();

  }

  move(){
    this.body.move();
    var coordo = toScreenPosition(this.mesh,camera);
    var tx = -1 + (coordo.x / WIDTH)*2;
    var ty = 1 - (coordo.y / HEIGHT)*2;
    var positionSouris = {x:tx, y:ty};

    if( Player.isLeftClick || this.body.mvt )
    {
      var diffX = Player.targetPos.x - this.mesh.position.x;
      var diffZ = Player.targetPos.z - this.mesh.position.z;

      var theta = Math.atan2(diffZ, diffX);

      var mvtX = Math.cos(theta);
      var mvtZ = Math.sin(theta);

      this.mesh.position.x += mvtX*1;
      this.mesh.position.z += mvtZ*1;

      if( Math.ceil(Player.targetPos.x/10) == Math.ceil(this.mesh.position.x/10)
      && Math.ceil(Player.targetPos.y/10) == Math.ceil(this.mesh.position.z/10))
      {

        this.body.mvt = false;
      } else {
        this.body.mvt = true;
      }
    }
    this.angle = Math.atan2(mousePos.x - positionSouris.x , -mousePos.y - positionSouris.y+0.14);


    this.body.mesh.rotation.y =  this.angle;

  }
}


var char;

function createCharacter(){
  char = new Char();
  char.mesh.position.x += 48;
  char.mesh.position.z += 48;
  char.mesh.scale.set(1.5,1.5,1.5);
  scene.add(char.mesh);

}

function animateCharacter(body){

  char.move();

}
