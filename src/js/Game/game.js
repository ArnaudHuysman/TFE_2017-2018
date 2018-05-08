
var renderer, raycaster, intersectPoint;


var deltaTime,
    mvtTime = 0,
    newTime = Date.now(),
    oldTime = Date.now();

var scene  = new THREE.Scene();


class Game {
  constructor(hero, map){

    this.hero = hero;
    this.map = map;
    this.context = new Scene();
    this.container = document.getElementById('world');
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    this.enemiesCollision = new CollisionEngine();

  }

  load(){

  }

  init(){

    // --------- EVENT LISTENER ------------ //
    window.addEventListener('mousemove', handleMouseMove, false);
    window.addEventListener('mousedown', function (e){
        if(e.button === 0){
            Player.isLeftClick = true;
            onDocumentMouseDown(e);
        }
        else if(e.button === 2){
            Player.isRightClick = true;
        }
    }, false);
    window.addEventListener('mouseup', function (e){
        if(e.button === 0){
            Player.isLeftClick = false;
        }
        else if(e.button === 2){
            Player.isRightClick = false;
        }
    }, false);
    window.addEventListener("keydown", function(evt){
      keys[evt.keyCode] = true;
    } );
    window.addEventListener("keyup", function(evt){
      keys[evt.keyCode] = false;
    } );
    document.addEventListener('contextmenu', event => event.preventDefault());
    window.addEventListener('resize', handleWindowResize, false);

    //GENERATE SCENE
    this.context.generateScene();

    //SET RENDERER SETTINGS
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(WIDTH,HEIGHT);

    this.renderer.shadowMap.enabled = true;

    //ADD RAYCASTER
    raycaster = new THREE.Raycaster();

    //SHOW GAME CONTAINER

    this.container.style.display = "block";
    this.container.appendChild(this.renderer.domElement);

    //ADD MAP TO Scene
    createBoardGame(this.map);

    //LAUNCH ANIMATION
    this.animation();
  }

  animation(){
    this.update();
    this.render();
    requestAnimationFrame(this.animation.bind(this))
  }

  update(){

    deltaTime = newTime - oldTime;
    oldTime = newTime;
    newTime = Date.now();
    mvtTime += deltaTime;

    this.hero.update(mvtTime);
    this.enemiesCollision.testCollision();
    drill.update(mvtTime, gameTime);
    updateWaves(mvtTime);
    checkPressedKeys();

    Heroes.standart.char.bulletFactory.update();
    for (var i = 0; i < GameObjects.enemies.length; i++) {
      GameObjects.enemies[i].update(mvtTime);
    }
  }

  render(){
    this.renderer.clear();
    this.renderer.render(scene, this.context.camera);
  }
}
