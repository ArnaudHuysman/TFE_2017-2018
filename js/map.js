var Colors = {
  orange:0xE53D00,
  yellow:0xFFE900,
  white:0xFCFFF7,
  blue:0x21A0A0,
  blueDark:0x046865,
}

window.addEventListener('load', init, false);

/*---------------------------------------------------------------
                           CAMERA
-----------------------------------------------------------------*/

var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
    renderer, container;

function createScene() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();

  //scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

  aspectRatio = WIDTH/HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;

  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  //camera.position.x = 1200;
  camera.position.z = 1200;
	camera.position.y = 1400;

  //camera.rotation.x = -0.85;

  camera.lookAt(new THREE.Vector3(0,0,300));

  renderer = new THREE.WebGLRenderer({
    alpha: true,

    antialias: true
  });

  renderer.setSize(WIDTH,HEIGHT);

  renderer.shadowMap.enabled = true;

  container = document.getElementById('world');
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
	// update height and width of the renderer and the camera
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}


/*---------------------------------------------------------------
                           LIGHT
-----------------------------------------------------------------*/

var hemisphereLight, shadowLight;

function createLights() {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);

  shadowLight = new THREE.DirectionalLight(0xffffff, .9);

  shadowLight.position.set(150,350,350);

  shadowLight.castShadow = true;

  shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

  shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);

}

/*---------------------------------------------------------------
                           OBJECT
-----------------------------------------------------------------*/

//-------------------------- Board Game -----------------------------//



BoardGame = function(clr){
  this.mesh = new THREE.Object3D();

  var geom = new THREE.BoxGeometry(48,48,48);
  var mat = new THREE.MeshPhongMaterial({
    color:clr,
    shading:THREE.FlatShading
  })


  for(i=0; i<32; i++){
    for(j=0; j<32; j++){

      var random = Math.floor(Math.random()*10);
      for (var k = 0; k < random+2; k++) {
        var c = new THREE.Mesh(geom,mat);
        c.position.x = i*52;
        c.position.z = j*52;
        c.position.y = -k*52;

        c.castShadow = true;
        //c.receiveShadow = true;

        this.mesh.add(c);
      }

    }
  }


}

var board;

function createBoardGame(){
  board = new BoardGame(Colors.blue);
  board.mesh.rotation.y = Math.PI/4;
  board.mesh.translateX(-16*52);
  board.mesh.translateZ(-16*52);

  scene.add(board.mesh);
}



var direction = null;

function handleKeyBoardDown(e) {
  switch(e.keyCode){
    case 37 :
      e.preventDefault();
        direction = "left";
      break;
    case 38 :
      e.preventDefault();

        direction = "up";

      break;
    case 39 :
      e.preventDefault();

        direction = "right";

      break;
    case 40 :
      e.preventDefault();

        direction = "down";

      break;
  }
}

function handleKeyBoardUp(e){
  direction = null;
}




function init(){
  document.addEventListener('keydown', handleKeyBoardDown, false);
  document.addEventListener('keyup', handleKeyBoardUp, false);

  createScene();
  createLights();

  createBoardGame();
  createCharacter();


  loop();
}

var deltaTime,
    mvtTime = 0,
    newTime = Date.now(),
    oldTime = Date.now();

var score = 0;

function loop(){

  deltaTime = newTime - oldTime;
  oldTime = newTime;
  newTime = Date.now();

  mvtTime += deltaTime;

  animateCharacter(char.body);

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}
