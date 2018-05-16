
import {Char} from './char_cstr';
import {TwinsGun} from './weapon_class';
import {AnimationSystem} from '../../animations/animationSystem';
import {ArmStandAnimation,LegStandAnimation,ArmShootAnimation,ArmWalkAnimation,LegWalkAnimation} from './animations';
import {Player, Mouse} from '../utils';
import BulletFactory from '../../objects/bulletFactory'
import {getCubeMapValue} from '../Maps/testPosition';

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

    this.char = new Char();
    this.char.mesh.position.z = 10;
    this.char.mesh.scale.set(2.5,2.5,2.5);

    game.threeContainer.add(this.char.mesh);


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

    this.char.mesh.up = new THREE.Vector3(0,0,1);
    this.char.mesh.lookAt(lookAtPoint);

    let pos = {
      x: this.char.mesh.position.x,
      y: this.char.mesh.position.y,
      z: -10
    }

    this.tilePos = getCubeMapValue(game,pos);

  }

  animation(){


  }

  movement(){

      var diffX = Player.targetPos.x - this.char.mesh.position.x;
      var diffY = Player.targetPos.y - this.char.mesh.position.y;

      var theta = Math.atan2(diffY, diffX);

      var mvtX = Math.cos(theta);
      var mvtY = Math.sin(theta);

      this.char.mesh.position.x += mvtX*2;
      this.char.mesh.position.y += mvtY*2;

      if( Math.ceil(Player.targetPos.x/10) == Math.ceil(this.char.mesh.position.x/10)
      && Math.ceil(Player.targetPos.y/10) == Math.ceil(this.char.mesh.position.y/10))
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
