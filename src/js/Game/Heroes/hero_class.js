
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
import {Bullet} from '../Enemies/Shooter/bullet_factory';

class Hero {
  constructor(game,scene) {

    this.currentGame = game;
    this.isShooting = false;
    this.gunShooting = "right";
    this.alreadyMoved = false;

    this.bulletFactory = new BulletFactory(game);

    this.fireRate = 300;
    this.interval = 0;

    this.tilePos = null;

    this.ressource = 0;
    this.lifes = 3;

    this.char = new Char();
    this.char.object.position.z = 12;
    this.char.object.position.x = -30;
    this.char.object.position.y = 30;

    // var geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );
    // var material = new THREE.MeshBasicMaterial( { color: 0xE8DB7D } );
    // this.point = new THREE.Mesh( geometry, material );
    //
    // scene.add( this.point );



    this.char.object.scale.set(2.5,2.5,2.5);

    scene.add(this.char.object);

    game.collisionEngine.addBody(this.char,"hero");


    this.leftWaepon = new TwinsGun();
    this.leftWaepon.mesh.position.set(-2.4,-1,-2.5);
    this.leftWaepon.mesh.scale.set(0.4,0.4,0.4);
    this.leftWaepon.mesh.rotation.set(Math.PI/2,0,-Math.PI/2);
    this.char.body.leftArm.object.add( this.leftWaepon.mesh );

    this.rightWaepon = new TwinsGun();
    this.rightWaepon.mesh.position.set(2.4,-1,-2.5);
    this.rightWaepon.mesh.scale.set(0.4,0.4,0.4);
    this.rightWaepon.mesh.rotation.set(Math.PI/2,0,-Math.PI/2);
    this.char.body.rightArm.object.add( this.rightWaepon.mesh );

    this.armsAnimationSystem = new AnimationSystem(new ArmStandAnimation(this.char.body));
    this.legsAnimationSystem = new AnimationSystem(new LegStandAnimation(this.char.body));
  }

  model(){


  }

  update(scene,tp,game){

    this.bulletFactory.update(scene);


    if(this.char.body.mvt && this.alreadyMoved === false){

      this.armsAnimationSystem.changeAnimation(new ArmWalkAnimation(this.char.body));
      this.legsAnimationSystem.changeAnimation(new LegWalkAnimation(this.char.body));
      this.alreadyMoved = true;

    }

    if(Player.isRightClick) {
      this.shoot(scene,tp);
      if(!this.isShooting){
        this.armsAnimationSystem.changeAnimation(new ArmShootAnimation(this.char.body));
        this.isShooting = true;
      }
    }


    if(!Player.isRightClick && this.isShooting){
      this.char.body.mvt ?
        this.armsAnimationSystem.changeAnimation(new ArmWalkAnimation(this.char.body))
        :
        this.armsAnimationSystem.changeAnimation(new ArmStandAnimation(this.char.body))
      this.isShooting = false;
    }

    var lookAtPoint = new THREE.Vector3(Mouse.projectPos.x,Mouse.projectPos.y,12);

    this.char.object.up = new THREE.Vector3(0,0,1);


    let pos = {
      x: this.char.object.position.x,
      y: this.char.object.position.y,
      z: 0
    };


    let value = getCubeMapValue(game,pos)

    if(value && value.name === "empty_tile") console.log("Fall");

    this.tilePos = value !== undefined ? value.arrayPos : this.tilePos ;

    this.char.object.lookAt(lookAtPoint);

    game.collisionEngine.testCollision("hero", "fragment");
    game.collisionEngine.testCollision("hero", "enemy_projectil");
    game.collisionEngine.testCollision("hero_projectil", "enemies");


    // Collision
    if(this.char.collision){
      switch( this.char.objectInCollision.name ){
        case "fragment":
          this.ressource += 1;
          game.collisionEngine.removeBody( this.char.objectInCollision, "fragment");
          console.log("ressource",this.ressource, game.collisionEngine.bodies["fragment"]);
          break;
        case "enemy_bullet":
          this.lifes -= 1;
          game.collisionEngine.removeBody( this.char.objectInCollision, "enemy_projectil");
          console.log("lifes", this.lifes);
          break;
      }

      scene.remove(this.char.objectInCollision.object);

      this.char.collision = false;
      this.char.objectInCollision = null;
    }
  }

  animation(){


  }

  movement(){

      var diffX = Player.targetPos.x - this.char.object.position.x;
      var diffY = Player.targetPos.y - this.char.object.position.y;

      var theta = Math.atan2(diffY, diffX);

      var mvtX = Math.cos(theta);
      var mvtY = Math.sin(theta);

      this.char.object.position.x += mvtX*2;
      this.char.object.position.y += mvtY*2;

      if( Math.ceil(Player.targetPos.x/10) == Math.ceil(this.char.object.position.x/10)
      && Math.ceil(Player.targetPos.y/10) == Math.ceil(this.char.object.position.y/10))
      {
        this.armsAnimationSystem.changeAnimation(new ArmStandAnimation(this.char.body))
        this.legsAnimationSystem.changeAnimation(new LegStandAnimation(this.char.body))
        this.char.body.mvt = false;
      } else {
        this.char.body.mvt = true;
      }


  }

  shoot(scene,tp){
    if( this.interval < tp){
      this.bulletFactory.create(scene);
      this.interval = tp+this.fireRate;
    }
  }
}

export class StandartHero extends Hero {
  constructor(game,scene){
    super(game,scene)
  }

}
