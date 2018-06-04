import {ScreenScene, SceneInfo} from './showreel_this.context.scene';

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


export class HeroShowreel {
  constructor(){

    this.container = document.getElementById('showreel');
    this.context = new ScreenScene(this.container);

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.raycaster = new THREE.Raycaster();

    this.hero = new StandartHero(this,this.context.scene);
    this.hero.char.object.position.set(0,0,0);

  }

  load(){

  }

  init(){
    //GENERATE SCENE
    this.context.generateScene(this.context.scene);
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

    controls  = new THREE.OrbitControls( this.context.camera, this.renderer.domElement );
    //helper = new THREE.AxesHelper(500);
    //this.context.scene.add(helper);

    //SET RENDERER SETTINGS
    this.renderer.setPixelRatio( window.devicePixelRatio );
    console.log(SceneInfo);
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
