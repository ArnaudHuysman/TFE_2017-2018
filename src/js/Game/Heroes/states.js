import {State} from '../Utils/state_machine'
import {ArmStandAnimation,LegStandAnimation,ArmShootAnimation,ArmWalkAnimation,LegWalkAnimation} from './animations';
import {Key} from '../Utils/keys_handler'
import {getCubeMapValue} from '../Utils/path_functions';

export class heroWalkState extends State {
	constructor(hero){
		super()
		this.hero = hero;
	}

	enter(){

    if(!(this.hero.armsAnimationSystem.currentAnimation instanceof ArmShootAnimation)) {
		  this.hero.armsAnimationSystem.changeAnimation(new ArmWalkAnimation(this.hero.char.body));
    }
		this.hero.legsAnimationSystem.changeAnimation(new LegWalkAnimation(this.hero.char.body));
	}

  update(){

		if(Key.isDown(90)) this.hero.char.object.position.y += 1.5;
		if(Key.isDown(83)) this.hero.char.object.position.y -= 1.5;
		if(Key.isDown(68)) this.hero.char.object.position.x += 1.5;
		if(Key.isDown(81)) this.hero.char.object.position.x -= 1.5;

		// Positions
    let pos = {
      x: this.hero.char.object.position.x,
      y: this.hero.char.object.position.y,
      z: 0
    };

		this.hero.point.position.set(pos.x,pos.y,30);

    let value = getCubeMapValue(this.hero.game,pos)

    if(value && value.name === "empty_tile") {
      this.hero.stateMachine.changeState(new heroFallingState(this.hero))
    };

    this.hero.tilePos = value !== undefined ? value.arrayPos : this.hero.tilePos ;

    let shootAnim  = this.hero.armsAnimationSystem.currentAnimation instanceof ArmShootAnimation;

    if(this.hero.isShooting){
      this.hero.shoot();
      if(!(shootAnim)){
        this.hero.armsAnimationSystem.changeAnimation(new ArmShootAnimation(this.hero.char.body));
      }
    } else {
      if(shootAnim){
        this.hero.armsAnimationSystem.changeAnimation(new ArmWalkAnimation(this.hero.char.body));
      }
    }

		if( !Key.isDown(90) && !Key.isDown(83) && !Key.isDown(68) && !Key.isDown(81)){
				this.hero.stateMachine.changeState(new heroStandState(this.hero))
		}

  }

}


export class heroStandState extends State {
	constructor(hero){
		super()
		this.hero = hero;
	}

	enter(){

    if(!(this.hero.armsAnimationSystem.currentAnimation instanceof ArmShootAnimation)) {
      this.hero.armsAnimationSystem.changeAnimation(new ArmStandAnimation(this.hero.char.body));
    }
    this.hero.legsAnimationSystem.changeAnimation(new LegStandAnimation(this.hero.char.body));
	}

  update(){


    let shootAnim  = this.hero.armsAnimationSystem.currentAnimation instanceof ArmShootAnimation;

    if(this.hero.isShooting){
      this.hero.shoot();
      if(!(shootAnim)){
        this.hero.armsAnimationSystem.changeAnimation(new ArmShootAnimation(this.hero.char.body));
      }
    } else {
      if(shootAnim){
        this.hero.armsAnimationSystem.changeAnimation(new ArmStandAnimation(this.hero.char.body));
      }
    }

		if( Key.isDown(90) || Key.isDown(83) || Key.isDown(68) || Key.isDown(81)){
				this.hero.stateMachine.changeState(new heroWalkState(this.hero))
		}

  }

}

export class heroFallingState extends State {
	constructor(hero){
		super()
		this.hero = hero;
	}

	enter(){
		console.log("Start Falling")
	 }

	update(){
		this.hero.char.object.position.z -= 10;

		if( this.hero.char.object.position.z < -500 ) this.hero.stateMachine.changeState(new heroSpawnState(this.hero))
	}

	exit(){
		this.hero.lifes--;
	}
}

export class heroDamagedState extends State {
	constructor(hero){
		super()
		this.hero = hero;
	}


}


export class heroSpawnState extends State {
	constructor(hero){
		super()
		this.hero = hero;
	}

	enter(){
		this.hero.char.object.position.z = 500;
    this.hero.char.object.position.x = -30;
    this.hero.char.object.position.y = 30;
	}

	update(){
		this.hero.char.object.position.z -= 10;
		if( this.hero.char.object.position.z < 12 ) this.hero.stateMachine.changeState(new heroStandState(this.hero));

	}

	exit(){ }
}
