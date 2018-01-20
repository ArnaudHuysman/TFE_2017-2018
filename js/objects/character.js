CharCons = function(){
  this.mesh = new THREE.Object3D();
  this.mesh.name = "character";

  //Body

  var geomBody = new THREE.BoxGeometry(36, 30, 28, 1, 1, 1);
  var matBody = new THREE.MeshPhongMaterial({color: Colors.blue, shading:THREE.FlatShading});

  this.body = new THREE.Mesh(geomBody, matBody);
  //body.castShadow = true;
  this.body.receiveShadow = true;


  // Head

  var geomHead = new THREE.BoxGeometry(48, 48, 48, 1, 1, 1);
  var matHead = new THREE.MeshPhongMaterial({color: 0xf25346, shading:THREE.FlatShading});

  this.body.head = new THREE.Mesh(geomHead, matHead);
  this.body.head.name = "head";
  this.body.head.position.y = 40;
  //head.castShadow = true;
  this.body.head.receiveShadow = true;
  this.body.add(this.body.head);



  //Legs

  var geomLeg = new THREE.BoxGeometry(16, 18, 18, 1, 1, 1);
  var matLeg = new THREE.MeshPhongMaterial({color: Colors.orange, shading:THREE.FlatShading});

  //Left Leg
  this.body.leftLeg = new THREE.Mesh(geomLeg, matLeg);

  this.body.leftLeg.geometry.translate( 0, -9, 0 );
  this.body.leftLeg.position.y = -18;
  this.body.leftLeg.position.x = -9;


  //body.castShadow = true;
  this.body.leftLeg.receiveShadow = true;
  this.body.add(this.body.leftLeg);

  //Right Leg
  this.body.rightLeg = this.body.leftLeg.clone();

  this.body.rightLeg.position.y = -18;
  this.body.rightLeg.position.x = 9;
  //rightLeg.rotation.x = Math.PI/8;
  //body.castShadow = true;
  this.body.rightLeg.receiveShadow = true;
  this.body.add(this.body.rightLeg);

  this.body.leftLeg.rotation.x = 0.5;
  this.body.rightLeg.rotation.x = -0.5;

  //Arms

  var geomArm = new THREE.BoxGeometry(8, 24, 12, 1, 1, 1);
  var matArm = new THREE.MeshPhongMaterial({color: Colors.orange, shading:THREE.FlatShading});

  //Left Arm
  this.body.leftArm = new THREE.Mesh(geomArm, matArm);

  this.body.leftArm.geometry.translate(0,-12,0);
  this.body.leftArm.position.y = 12;
  this.body.leftArm.position.x = -24;


  //body.castShadow = true;
  this.body.leftArm.receiveShadow = true;
  this.body.add(this.body.leftArm);

  //Right Arm
  this.body.rightArm = this.body.leftArm.clone();
  this.body.rightArm.position.x = 24;
  //body.castShadow = true;
  this.body.rightArm.receiveShadow = true;
  this.body.add(this.body.rightArm);

  this.body.leftArm.rotation.x = -0.5;
  this.body.rightArm.rotation.x = 0.5

  this.mesh.add(this.body);
}

var char;

function createCharacter(){
  char = new CharCons();
  scene.add(char.mesh);
}

function animateCharacter(body){

  if(body.leftLeg.rotation.x > 0.4)
  {
    body.leftLeg.rotation.x -= 0.1;
  } else if (body.leftLeg.rotation.x < -0.4)
  {
    body.leftLeg.rotation.x += 0.1;
  } else {
    body.leftLeg.rotation.x += 0.1;
  }



  body.rightLeg.rotation.x -= 0.1;

}
