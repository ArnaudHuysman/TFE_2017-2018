import {ScreenScene, SceneInfo} from './showreel_scene';

import Map from '../../Game/Maps/Map/map_cstr';
import Utils,{Player,keys, GameObjects} from '../../Game/Utils/utils';
import {Key}  from '../../Game/Utils/keys_handler';

import {checkPressedKeys} from '../../Game/Utils/keys_handler';
import {StandartHero} from '../../Game/Heroes/hero_class';


var raycaster, intersectPoint;
var deltaTime,
    mvtTime = 0,
    newTime = Date.now(),
    oldTime = Date.now();



var controls, helper;


export class MapScene {
  constructor(container,map){

    this.container = container;
    this.context = new ScreenScene(this.container, map);

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.raycaster = new THREE.Raycaster();

    this.threeContainer = new THREE.Object3D();

    this.map = new Map(this,map,this.context.scene,false);

    this.pivot = new THREE.Object3D();
    this.threeContainer.position.y = - (map.structure.length/2)*(24);
    this.threeContainer.position.x = - (map.structure[0].length/2)*(24);

    this.pivot.add( this.threeContainer );

    this.context.scene.add( this.pivot );
    this.pivot.rotation.z = -45* Math.PI / 180;

  }

  load(){

  }

  init(){
    //GENERATE SCENE
    this.context.generateScene();

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

    var timer = Date.now() * 0.00025;
  }

  render(){
    this.renderer.clear();
    this.renderer.render(this.context.scene, this.context.camera);
  }
}
