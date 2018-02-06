var Colors = {
  orange:0xE53D00,
  yellow:0xFFE900,
  white:0xFCFFF7,
  blue:0x21A0A0,
  blueDark:0x046865,
}

var Player = {
  isRightClick: false,
  isLeftClick: false,
  targetPos : { x: 0, z: 0 }
}

window.addEventListener('load', init, false);

/*---------------------------------------------------------------
                           CAMERA
-----------------------------------------------------------------*/

var scene, scene2,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
    renderer, container, raycaster;

function createScene() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  //scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

  aspectRatio = WIDTH/HEIGHT;
  fieldOfView = 30;
  nearPlane = 1;
  farPlane = 10000;

  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  //camera.position.x = 1200;
  camera.position.z = 600;
	camera.position.y = 500;

  //camera.rotation.x = -0.85;

  camera.lookAt(new THREE.Vector3(0,0,0));

  renderer = new THREE.WebGLRenderer({
    alpha: true,

    antialias: true
  });


  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(WIDTH,HEIGHT);

  renderer.shadowMap.enabled = true;

  raycaster = new THREE.Raycaster();

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


  scene.add(hemisphereLight);
  scene.add(shadowLight);

}

/*---------------------------------------------------------------
                           OBJECT
-----------------------------------------------------------------*/


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
  //direction = null;
}

var mousePos = {
  x : 0,
  y : 0
}

var rightClick = {
  x : 0,
  z : 0
}

function handleMouseMove(event) {
  var tx = -1 + (event.clientX / WIDTH)*2;
  var ty = 1 - (event.clientY / HEIGHT)*2;
  mousePos = {x:tx, y:ty};
}

function toScreenPosition(obj, camera)
{
    var vector = new THREE.Vector3();

    var widthHalf = 0.5*renderer.context.canvas.width;
    var heightHalf = 0.5*renderer.context.canvas.height;

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);

    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;

    return {
        x: vector.x,
        y: vector.y
    };

};

function onDocumentMouseDown( event ) {

  event.preventDefault();

    raycaster.setFromCamera( mousePos, camera );

    var intersects = raycaster.intersectObjects( mapTiles );

    if ( intersects.length > 0 ) {

      Player.targetPos.x = intersects[0].point.x;
      Player.targetPos.z = intersects[0].point.z;

    }

}

function onRightClick(event){

  event.preventDefault();

    raycaster.setFromCamera( mousePos, camera );

    var intersects = raycaster.intersectObjects( mapTiles );

    if ( intersects.length > 0 ) {

      rightClick.x = intersects[0].point.x;
      rightClick.z = intersects[0].point.z;

    }

    char.bulletFactory.create();

}







function init(){
  //document.addEventListener('keydown', handleKeyBoardDown, false);
  //document.addEventListener('keyup', handleKeyBoardUp, false);
  document.addEventListener('mousemove', handleMouseMove, false);

  document.body.addEventListener('mousedown', function (e){

      if(e.button === 0){
          Player.isLeftClick = true;
          onDocumentMouseDown(e);
      }
      else if(e.button === 2){
          Player.isRightClick = true;
          onRightClick(e);

      }
  }, false);

  document.body.addEventListener('mouseup', function (e){
      if(e.button === 0){
          Player.isLeftClick = false;
      }
      else if(e.button === 2){
          Player.isRightClick = false;
      }
  }, false);

  document.addEventListener('contextmenu', event => event.preventDefault());

  setTimeout(function(){
    enemiesSpawn();
  }, 2000)

  createScene();
  createLights();

  createBoardGame();
  createCharacter();
  createDrilling();

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

  char.bulletFactory.update();


  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}
