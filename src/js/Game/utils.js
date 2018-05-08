/*---------------------------------------------------------------
                           Constante
-----------------------------------------------------------------*/

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

const GameObjects = {
  updatableMesh : [],
  collidableMesh : [],
  enemies: []
}

const Heroes = {
  standart : null,
}

const gameTime = 120;


const keys = [];


/*---------------------------------------------------------------
                           HANDLERS
-----------------------------------------------------------------*/


function handleWindowResize() {
	// update height and width of the renderer and the camera
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	game.renderer.setSize(WIDTH, HEIGHT);
	game.context.camera.aspect = WIDTH / HEIGHT;
	game.context.camera.updateProjectionMatrix();
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

  vector.unproject( game.context.camera );

  var dir = vector.sub( game.context.camera.position ).normalize();
  var distance = - (game.context.camera.position.z - 10) / dir.z;
  var pos = game.context.camera.position.clone().add( dir.multiplyScalar( distance ) );
  return pos;
}



function onDocumentMouseDown( event ) {

  event.preventDefault();

    raycaster.setFromCamera( mousePos, game.context.camera );

    var intersects = raycaster.intersectObjects( mapTiles );

    if ( intersects.length > 0 ) {

      Player.targetPos.x = intersects[0].point.x;
      Player.targetPos.y = intersects[0].point.y;

    }
}
