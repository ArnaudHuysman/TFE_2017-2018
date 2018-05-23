
import {Scene, SceneInfo} from './Scene/Scene';
import {CollisionEngine} from './Utils/collision_system';
import Utils,{Player,keys, GameObjects}  from './Utils/utils';
import Map, {createBoardGame} from './Maps/Map/map_cstr';
import {Drill} from './Maps/Map/drill_cstr';
import {updateWaves} from './System/waves';
import {checkPressedKeys} from './Utils/keys_handler';
import EnemyFactory from './Enemies/enemy_factory';
import {StandartHero} from './Heroes/hero_class';
import Fragment from './Maps/Fragment/fragment_cstr';

var raycaster, intersectPoint;
var deltaTime,
    mvtTime = 0,
    newTime = Date.now(),
    oldTime = Date.now();

const gameTime = 120;

var controls, helper;


export class Game {
  constructor(map, scene){

    this.threeContainer = new THREE.Object3D();


    this.heroCollision = new CollisionEngine();
    this.hero = new StandartHero(this,scene);


    this.map = new Map(this,map,scene);
    this.drill = new Drill(this,scene,gameTime);
    this.context = new Scene(scene,this.map);
    this.container = document.getElementById('world');
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.raycaster = new THREE.Raycaster();

    this.enemyFactory = new EnemyFactory(this,scene);
    this.enemiesCollision = new CollisionEngine();

    this.pivot = new THREE.Object3D();
    this.threeContainer.position.y = -10.5*(24);
    this.threeContainer.position.x = -10.5*(24);

    this.pivot.add( this.threeContainer );

    scene.add( this.pivot );
    this.pivot.rotation.z = -45* Math.PI / 180;
    //this.threeContainer.updateMatrixWorld();
  }

  load(){

  }

  init(scene){
    //GENERATE SCENE
    this.context.generateScene(scene);
    // --------- EVENT LISTENER ------------ //
    window.addEventListener('mousemove', e => Utils.handleMouseMove(e , SceneInfo, this), false);
    window.addEventListener('mousedown', e => {
        if(e.button === 0){
            Player.isLeftClick = true;
            Utils.onDocumentMouseDown(e,this);
        }
        else if(e.button === 2){
            Player.isRightClick = true;
        }
    }, false);
    window.addEventListener('mouseup', e => {
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
    window.addEventListener('resize', e => Utils.handleWindowResize(SceneInfo,this), false);

    //controls  = new THREE.OrbitControls( this.context.camera, this.renderer.domElement );
    //helper = new THREE.AxesHelper(500);
    //scene.add(helper);

    //SET RENDERER SETTINGS
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(SceneInfo.WIDTH,SceneInfo.HEIGHT);

    this.renderer.shadowMap.enabled = true;

    //SHOW GAME CONTAINER

    this.container.style.display = "block";
    this.container.appendChild(this.renderer.domElement);

    //LAUNCH ANIMATION
    this.animation(scene);
  }

  animation(scene){
    this.update(scene);
    this.render(scene);
    requestAnimationFrame(this.animation.bind(this,scene))
  }

  update(scene){

    deltaTime = newTime - oldTime;
    oldTime = newTime;
    newTime = Date.now();
    mvtTime += deltaTime;

    var timer = Date.now() * 0.00025;

    // Makes caera turns around the map;
    // var x = this.context.camera.position.x;
    // var y = this.context.camera.position.y;
    // this.context.camera.position.y = y * Math.cos(0.005) + x * Math.sin(0.005);
    // this.context.camera.position.x = x * Math.cos(0.005) - y * Math.sin(0.005);
    //
    // this.context.camera.up = new THREE.Vector3(0,0,1);
    //
    // this.context.camera.lookAt( scene.position );

    this.hero.update(scene,mvtTime,this);
    this.enemiesCollision.testCollision();
    this.heroCollision.testCollision();
    //this.hero.collisionEngine.testCollision();
    this.drill.update(mvtTime, gameTime);
    updateWaves(this,scene,mvtTime);
    checkPressedKeys(this.hero);

    this.hero.bulletFactory.update(scene);
    for (var i = 0; i < GameObjects.enemies.length; i++) {
      GameObjects.enemies[i].update(mvtTime);
    }
  }

  render(scene){
    this.renderer.clear();
    this.renderer.render(scene, this.context.camera);
  }
}
