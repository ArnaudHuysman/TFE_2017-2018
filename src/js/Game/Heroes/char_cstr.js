
 const CharColors = {
  mainColor: 0x0a2444,
  outlinerColor: 0xd90368
 }

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
  }
}

class Arm extends Bodypart {
  constructor(width, height, depth, color, name) {

    super(width, height, depth, color, name);

    this.mesh.geometry.translate(0,0,-1.2);
    this.mesh.position.z = 0.6;
    this.mesh.position.x = this.name == "leftArm" ? -2.4 : 2.4;

    this.outliner.position.set(this.mesh.position.x,this.mesh.position.y,this.mesh.position.z);
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
}


// Body Class

class Body extends Bodypart {
  constructor(width, height, depth, color, name) {

    super(width, height, depth, color, name);

    this.mvt = false;
    this.legs = [];
    this.arms = [];

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
    this.legs.push( this.leftLeg );
    this.legs.push( this.rightLeg );


    // Arms
    this.leftArm = new Arm(0.8, 2.4, 1, CharColors.mainColor, "leftArm" );
    this.rightArm = new Arm(0.8, 2.4, 1, CharColors.mainColor, "rightArm" );

    this.object.add( this.leftArm.object );
    this.object.add( this.rightArm.object );
    this.arms.push( this.leftArm );
    this.arms.push( this.rightArm );

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

    this.mesh.add( this.body.object );
    this.bulletFactory = new BulletFactory();

  }
}
