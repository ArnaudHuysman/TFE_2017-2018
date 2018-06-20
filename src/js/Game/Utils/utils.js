/*---------------------------------------------------------------
                           Constante
-----------------------------------------------------------------*/

export const Colors = {
  charColors : {
    mainColor: 0x0a2444,
    outlinerColor: 0xd90368
  },
  gameColors : {
    orange:0xE53D00,
    yellow:0xFFE900,
    white:0xFCFFF7,
    blue:0x21A0A0,
    blueDark:0x046865,
  }
}


export const Player = {
  isRightClick: false,
  isLeftClick: false,
  targetPos : { x: 0, y: 0 },
  fragments: 0,
}

export const keys = [];

export const Heroes = [
  {
    name : "simpleGuy",
    waepon : "duble pistol",
    tpye : "normal"
  },
  {
    name : "scientist",
    waepon : "fiole",
    tpye : "normal"
  },
  {
    name : "bigGuy",
    waepon : "shotgun",
    tpye : "normal"
  },
  {
    name : "engeneer",
    waepon : "cle",
    tpye : "normal"
  }
]


export const Mouse = {
  pos : new THREE.Vector2(0, 0),
  projectPos : new THREE.Vector3(0, 0, 0)
}

/*---------------------------------------------------------------
                           HANDLERS
-----------------------------------------------------------------*/
const Utils = {

  handleWindowResize : function(SceneInfo,game){
  	// update height and width of the renderer and the camera
    SceneInfo.HEIGHT = game.container.offsetHeight;
	  SceneInfo.WIDTH = game.container.offsetWidth;
  	game.renderer.setSize(SceneInfo.WIDTH, SceneInfo.HEIGHT);
  	game.context.camera.aspect = SceneInfo.WIDTH / SceneInfo.HEIGHT;
  	game.context.camera.updateProjectionMatrix();
  },

  handleMouseMove : function(event,SceneInfo, game){
    var tx = -1 + (event.clientX / SceneInfo.WIDTH)*2;
    var ty = 1 - (event.clientY / SceneInfo.HEIGHT)*2;

    Mouse.pos = {x:tx, y:ty};

    Mouse.projectPos = this.toWorldPosition(event, Mouse.pos, game);
  },

  toScreenPosition : function(obj, camera)
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

  },

  toWorldPosition : function(event, mouse, game){
    var vector = new THREE.Vector3();

    vector.set( mouse.x, mouse.y, 0.5 );

    vector.unproject( game.context.camera );

    var dir = vector.sub( game.context.camera.position ).normalize();
    var distance = - (game.context.camera.position.z - 10) / dir.z;
    var pos = game.context.camera.position.clone().add( dir.multiplyScalar( distance ) );
    return pos;
  },

  onDocumentMouseDown : function( event, game ) {
    event.preventDefault();
  }
}

export default Utils;
