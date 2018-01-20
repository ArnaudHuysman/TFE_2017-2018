


class Bodypart {
  constructor(width, height, depth, color, name) {

    this.geom = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({color, shading:THREE.FlatShading});

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.receiveShadow = true;

    this.name = name;

  }
}

class Leg extends Bodypart {
  constructor(width, height, depth, color, name) {

    super(width, height, depth, color, name);

    this.mesh.geometry.translate( 0, -9, 0 );
    this.mesh.position.y = -18;
    this.mesh.position.x = this.name == "leftLeg" ? -9 : 9;

    this.mvt = this.name == "leftLeg" ? "backward" : "forward";
    this.rot = this.name == "leftLeg" ? -0.05 : 0.05;

  }

  move(){

    if(this.mesh.rotation.x > 0.4 && this.mvt == "forward")
    {
      this.rot = -0.05;
      this.mvt ="backward"
    } else if(this.mesh.rotation.x < -0.4 && this.mvt == "backward")
    {
      this.rot = 0.05;
      this.mvt ="forward"
    }

    this.mesh.rotation.x += this.rot;
  }
}

class Arm extends Bodypart {
  constructor(width, height, depth, color, name) {

      super(width, height, depth, color, name);

      this.mesh.geometry.translate(0,-12,0);
      this.mesh.position.y = 12;
      this.mesh.position.x = this.name == "leftArm" ? -24 : 24;

      this.mvt = this.name == "rightArm" ? "backward" : "forward";
      this.rot = this.name == "rightArm" ? -0.05 : 0.05;
  }

  move(){

    if(this.mesh.rotation.x > 0.4 && this.mvt == "forward")
    {
      this.rot = -0.05;
      this.mvt ="backward"
    } else if(this.mesh.rotation.x < -0.4 && this.mvt == "backward")
    {
      this.rot = 0.05;
      this.mvt ="forward"
    }

    this.mesh.rotation.x += this.rot;

  }
}

class Head extends Bodypart {
  constructor(width, height, depth, color, name) {

    super(width, height, depth, color, name);

    this.mesh.position.y = 40;

    this.rightEye = new Bodypart(8,8,8,0xFFFFFF, "rightEye");
    this.rightEye.mesh.position.z += 23;
    this.rightEye.mesh.position.y += 8;
    this.rightEye.mesh.position.x += 10;

    this.mesh.add(this.rightEye.mesh);

    this.leftEye = new Bodypart(8,8,8,0xFFFFFFF, "leftEye");
    this.leftEye.mesh.position.z += 23;
    this.leftEye.mesh.position.y += 8;
    this.leftEye.mesh.position.x += -10;

    this.mesh.add(this.leftEye.mesh);


    this.mvt = "up";
    this.rot = 0.25;

  }

  move(){
    if(this.mesh.position.y > 41 && this.mvt == "up")
    {
      this.rot = -0.25;
      this.mvt ="down";
    } else if(this.mesh.position.y < 39 && this.mvt == "down")
    {
      this.rot = 0.25;
      this.mvt ="up";
    }

    this.mesh.position.y += this.rot;
  }
}


// Body Class

class Body extends Bodypart {
  constructor(width, height, depth, color, name) {

    super(width, height, depth, color, name);

    this.movable = [];
    // Head
    this.head = new Head(48, 48, 48, 0xE53D00, "head");

    this.mesh.add( this.head.mesh );
    this.movable.push(this.head);

    // Legs
    this.leftLeg = new Leg(16, 18, 18, 0xE53D00, "leftLeg" );
    this.rightLeg = new Leg(16, 18, 18, 0xE53D00, "rightLeg" );

    this.mesh.add( this.leftLeg.mesh );
    this.mesh.add( this.rightLeg.mesh );

    this.movable.push(this.leftLeg,this.rightLeg);

    // Arms
    this.leftArm = new Arm(8, 24, 12, 0xE53D00, "leftArm" );
    this.rightArm = new Arm(8, 24, 12, 0xE53D00, "rightArm" );

    this.mesh.add( this.leftArm.mesh );
    this.mesh.add( this.rightArm.mesh );

    this.movable.push(this.leftArm,this.rightArm);


  }

  move(){

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

    this.body = new Body(36, 30, 28, 0x21A0A0);
    this.mesh.add( this.body.mesh );

  }

  move(){
    this.body.move();
  }
}


var char;

function createCharacter(){
  char = new Char();
  scene.add(char.mesh);
}

function animateCharacter(body){

  char.move();

}
