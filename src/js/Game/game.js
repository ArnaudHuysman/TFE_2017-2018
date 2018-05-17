
import {Scene, SceneInfo} from './Scene/Scene';
import {CollisionEngine} from '../utilities/collision_system';
import Utils,{Player,keys, GameObjects}  from './utils';
import {createBoardGame} from './Maps/firstMap';
import {Drill} from './Maps/drill';
import {updateWaves} from './Maps/waves';
import Map from './Maps/FirstMap';
import {checkPressedKeys} from '../objects/keys_handler';
import EnemyFactory from './Enemies/enemy_factory';
import {StandartHero} from './Heroes/hero_class';

var raycaster, intersectPoint;
var deltaTime,
    mvtTime = 0,
    newTime = Date.now(),
    oldTime = Date.now();

const gameTime = 120;



export class Game {
  constructor(map, scene){

    this.threeContainer = new THREE.Object3D();


    this.hero = new StandartHero(this,scene);
    this.drill = new Drill(this,scene,gameTime);
    this.map = new Map(this,map,scene);
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
    this.threeContainer.position.y = -10*(24);
    this.threeContainer.position.x = -10*(24);

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

    this.hero.update(scene,mvtTime,this);
    this.enemiesCollision.testCollision();
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
