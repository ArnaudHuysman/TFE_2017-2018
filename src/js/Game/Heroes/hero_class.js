
import {Char} from './char_cstr';
import {TwinsGun} from './weapon_class';
import {AnimationSystem} from '../../animations/animationSystem';
import {ArmStandAnimation,LegStandAnimation,ArmShootAnimation,ArmWalkAnimation,LegWalkAnimation} from './animations';
import {Player, Mouse} from '../Utils/utils';
import BulletFactory from './bulletFactory'
import {getCubeMapValue} from '../Utils/path_functions';
import {CollisionEngine} from '../Utils/collision_system';
import Fragment from '../Maps/Fragment/fragment_cstr'
import {GameObjects} from '../Utils/utils';
import {Key} from '../Utils/keys_handler'
import {Bullet} from '../Enemies/Shooter/bullet_factory';
import StateMachine from '../Utils/state_machine';
import {heroWalkState, heroStandState, heroFalling} from './states'
import {scene} from '../Scene/Scene'

class Hero {
  constructor(game,scene) {

    this.game = game;
    this.scene = scene;
    this.isShooting = false;
    this.gunShooting = "right";
    this.alreadyMoved = false;

    this.bulletFactory = new BulletFactory(game);


    this.fireRate = 300;
    this.interval = 0;
    this.time = 0;

    this.tilePos = null;

    this.ressource = 0;
    this.lifes = 3;

    this.char = new Char();

    var geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );
    var material = new THREE.MeshBasicMaterial( { color: 0xE8DB7D } );
    this.point = new THREE.Mesh( geometry, material );

    this.scene.add( this.point );



    this.char.object.scale.set(2.5,2.5,2.5);

    this.scene.add(this.char.object);


    this.leftWaepon = new TwinsGun();
    this.leftWaepon.mesh.position.set(-2.4,-1.4,-2);
    this.leftWaepon.mesh.scale.set(0.4,0.4,0.4);
    this.leftWaepon.mesh.rotation.set(Math.PI/2,0,-Math.PI/2);
    this.char.body.leftArm.object.add( this.leftWaepon.mesh );

    this.rightWaepon = new TwinsGun();
    this.rightWaepon.mesh.position.set(2.4,-1.4,-2);
    this.rightWaepon.mesh.scale.set(0.4,0.4,0.4);
    this.rightWaepon.mesh.rotation.set(Math.PI/2,0,-Math.PI/2);
    this.char.body.rightArm.object.add( this.rightWaepon.mesh );

    this.armsAnimationSystem = new AnimationSystem();
    this.legsAnimationSystem = new AnimationSystem();

    this.stateMachine = new StateMachine(new heroStandState(this));

  }

  model(){


  }

  update(tp,game){

    this.time = tp;

    // Mouse Action
    this.isShooting = Player.isRightClick ? true : false;

    this.stateMachine.currentState.update();
    this.bulletFactory.update(this.scene);

    var lookAtPoint = new THREE.Vector3(Mouse.projectPos.x,Mouse.projectPos.y,12);

    this.char.object.up = new THREE.Vector3(0,0,1);

    this.char.object.lookAt(lookAtPoint);


    // Collision

    game.collisionEngine.testCollision("hero", "fragment");
    game.collisionEngine.testCollision("hero", "enemy_projectil");
    game.collisionEngine.testCollision("hero_projectil", "enemies");

    if(this.char.collision){
      switch( this.char.objectInCollision.name ){
        case "fragment":
          this.ressource++;
          game.screenInfo.fragment++;
          game.collisionEngine.removeBody( this.char.objectInCollision, "fragment");
          console.log("ressource",this.ressource, game.collisionEngine.bodies["fragment"]);
          break;
        case "enemy_bullet":
          this.lifes--;
          game.screenInfo.hero_lifes--;
          game.collisionEngine.removeBody( this.char.objectInCollision, "enemy_projectil");
          console.log("lifes", this.lifes);
          break;
      }

      this.scene.remove(this.char.objectInCollision.object);

      this.char.collision = false;
      this.char.objectInCollision = null;
    }
  }

  animation(){


  }

  movement(){



  }

  shoot(){
    if( this.interval < this.time){
      this.bulletFactory.create(this.scene);
      this.interval = this.time+this.fireRate;
    }
  }
}

export class StandartHero extends Hero {
  constructor(game,scene){
    super(game,scene)
  }

}
