
import {Scene, SceneInfo} from './Scene/Scene';
import {CollisionEngine} from './Utils/collision_system';
import Utils,{Player,keys, GameObjects}  from './Utils/utils';
import {Key}  from './Utils/keys_handler';
import Map, {createBoardGame} from './Maps/Map/map_cstr';
import {initWaves, updateWaves} from './System/waves';
import EnemyFactory from './Enemies/enemy_factory';
import StateMachine from './Utils/state_machine';
import GameLoadingState from './Game_States/gameLoading_state';




var raycaster, intersectPoint;
var deltaTime,
    mvtTime = 0,
    newTime = 0,
    oldTime = 0;


var controls, helper;


export class Game {
  constructor(map,hero){

    this.screenInfo = {
      fragment : 0,
      waves : 0,
      totalWaves : 0,
      drill_lifes: 10,
      hero_lifes: 3,

    }

    this.context = new Scene();
    this.container = document.getElementById('world');
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.raycaster = new THREE.Raycaster();
    this.collisionEngine = new CollisionEngine();
    this.stateMachine = new StateMachine(new GameLoadingState(this));

    this.threeContainer = new THREE.Object3D();

    this.hero = null;
    this.enemyFactory = null;
    this.enemies =[];

    this.map = new Map(this,map,this.context.scene);

    this.pivot = new THREE.Object3D();
    this.threeContainer.position.y = - (map.structure.length/2)*(24);
    this.threeContainer.position.x = - (map.structure[0].length/2)*(24);

    this.pivot.add( this.threeContainer );

    this.context.scene.add( this.pivot );
    this.pivot.rotation.z = -45* Math.PI / 180;
    //this.threeContainer.updateMatrixWorld();

  }

  init(){
    //GENERATE SCENE
    //this.context.generateScene();

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
      Key.onKeydown(evt);
    } );
    window.addEventListener("keyup", function(evt){
      Key.onKeyup(evt);
    } );
    document.addEventListener('contextmenu', event => event.preventDefault());
    window.addEventListener('resize', e => Utils.handleWindowResize(SceneInfo,this), false);

    //controls  = new THREE.OrbitControls( this.context.camera, this.renderer.domElement );
    //helper = new THREE.AxesHelper(500);
    //this.context.scene.add(helper);

    //SET RENDERER SETTINGS
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(SceneInfo.WIDTH,SceneInfo.HEIGHT);

    this.renderer.shadowMap.enabled = true;

    //SHOW GAME CONTAINER

    this.container.style.display = "block";
    this.container.appendChild(this.renderer.domElement);

    //initWaves(this);
    //LAUNCH ANIMATION
    newTime = Date.now(),
    oldTime = Date.now();
    this.animation();
  }

  animation(){
    this.update();
    this.render();
    requestAnimationFrame(this.animation.bind(this))
  }

  update(){

    newTime = Date.now();
    deltaTime = newTime - oldTime;
    oldTime = newTime;

    mvtTime += deltaTime;

    var timer = Date.now() * 0.00025;

		this.context.pointLight.position.x = Math.sin( timer ) * 800;
		this.context.pointLight.position.y = Math.cos( timer ) * 800;

    this.stateMachine.currentState.update(mvtTime);

    //Makes caera turns around the map;
    // var x = this.context.camera.position.x;
    // var y = this.context.camera.position.y;
    // this.context.camera.position.y = y * Math.cos(0.005) + x * Math.sin(0.005);
    // this.context.camera.position.x = x * Math.cos(0.005) - y * Math.sin(0.005);
    //
    // this.context.camera.up = new THREE.Vector3(0,0,1);
    //
    // this.context.camera.lookAt( this.context.scene.position );


    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update(mvtTime,this.context.scene);
    }
  }

  render(){
    this.renderer.clear();
    this.renderer.render(this.context.scene, this.context.camera);
  }
}
