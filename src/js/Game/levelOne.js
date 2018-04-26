
const Colors = {
  orange:0xE53D00,
  yellow:0xFFE900,
  white:0xFCFFF7,
  blue:0x21A0A0,
  blueDark:0x046865,
}

const Player = {
  isRightClick: false,
  isLeftClick: false,
  targetPos : { x: 0, y: 0 },
  score: 0,
}

const Game = {
  updatableMesh : [],
  collidableMesh : [],
  enemies: []
}



/*---------------------------------------------------------------
                           INIT
-----------------------------------------------------------------*/

var scene, scene2,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
    renderer, container, raycaster,
    plane, intersectPoint;

scene = new THREE.Scene();


var enemiesCollision, counter, interval;

var Game_Scene;

var deltaTime,
    mvtTime = 0,
    newTime = Date.now(),
    oldTime = Date.now();


window.addEventListener('load', init, false);


function init(){


  Game_Scene = new Scene();
  document.addEventListener('mousemove', handleMouseMove, false);

  document.body.addEventListener('mousedown', function (e){

      if(e.button === 0){
          Player.isLeftClick = true;
          onDocumentMouseDown(e);
      }
      else if(e.button === 2){
          Player.isRightClick = true;
          Heroes.standart.char.bulletFactory.create();
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


  Game_Scene.createScene();

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
  handleWindowResize();

  Game_Scene.createLights();

  Game_Scene.lights.forEach(function( light ) {
    scene.add(light);
  })

  createBoardGame();
  //createCharacter();
  //createDrilling();

  enemiesCollision = new CollisionEngine();

  animation();
}




function animation(){
  update();
  render();
  requestAnimationFrame(animation);
}

function update(){
  deltaTime = newTime - oldTime;
  oldTime = newTime;
  newTime = Date.now();

  mvtTime += deltaTime;

  if( counter === 9) clearInterval(interval);

  if( Player.score === 10 ) console.log("VICTORY");

  Heroes.standart.update();
  //animateCharacter(Heroes.standart);

  Heroes.standart.movement();


  enemiesCollision.testCollision();

  Heroes.standart.char.bulletFactory.update();
  for (var i = 0; i < Game.enemies.length; i++) {
    Game.enemies[i].update();

  }
}


function render(){
  renderer.clear();
  renderer.render(scene, Game_Scene.camera);
}



/*---------------------------------------------------------------
                           HANDLERS
-----------------------------------------------------------------*/


function handleWindowResize() {
	// update height and width of the renderer and the camera
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	Game_Scene.camera.aspect = WIDTH / HEIGHT;
	Game_Scene.camera.updateProjectionMatrix();
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
  //direction = null;
}

var mousePos = new THREE.Vector2(0, 0)

var mouseProjectPos = new THREE.Vector3(0, 0, 0);

var rightClick = {
  x : 0,
  z : 0
}

function handleMouseMove(event) {

  var tx = -1 + (event.clientX / WIDTH)*2;
  var ty = 1 - (event.clientY / HEIGHT)*2;
  mousePos = {x:tx, y:ty};

  mouseProjectPos = toWorldPosition(event, mousePos);
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

function toWorldPosition(event, mouse){
  var vector = new THREE.Vector3();

  vector.set( mouse.x, mouse.y, 0.5 );

  vector.unproject( Game_Scene.camera );

  var dir = vector.sub( Game_Scene.camera.position ).normalize();
  var distance = - (Game_Scene.camera.position.z - 50) / dir.z;
  var pos = Game_Scene.camera.position.clone().add( dir.multiplyScalar( distance ) );
  return pos;
}



function onDocumentMouseDown( event ) {

  event.preventDefault();

    raycaster.setFromCamera( mousePos, Game_Scene.camera );

    var intersects = raycaster.intersectObjects( mapTiles );

    if ( intersects.length > 0 ) {

      Player.targetPos.x = intersects[0].point.x;
      Player.targetPos.y = intersects[0].point.y;

    }
}
