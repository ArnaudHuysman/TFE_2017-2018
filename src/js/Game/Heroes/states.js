import {State} from '../Utils/state_machine'
import {ArmStandAnimation,LegStandAnimation,ArmShootAnimation,ArmWalkAnimation,LegWalkAnimation} from './animations';
import {Key} from '../Utils/keys_handler'
import {getCubeMapValue} from '../Utils/path_functions';


// Hero movement states
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
				this.hero.movementStateMachine.changeState(new heroStandState(this.hero))
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
				this.hero.movementStateMachine.changeState(new heroWalkState(this.hero))
		}

  }

}

export class heroStillState extends State {
	constructor(hero){
		super()
		this.hero = hero;
	}

	enter(){
    this.hero.armsAnimationSystem.changeAnimation(new ArmStandAnimation(this.hero.char.body));
    this.hero.legsAnimationSystem.changeAnimation(new LegStandAnimation(this.hero.char.body));
	}
}


// Hero states

export class heroBasicState extends State{
	constructor(hero){
		super()
		this.hero = hero;
	}

	update(){
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
			this.hero.movementStateMachine.changeState(new heroStillState(this.hero))
    };

    this.hero.tilePos = value !== undefined ? value.arrayPos : this.hero.tilePos ;

		if(this.hero.char.collision){
			switch( this.hero.char.objectInCollision.name ){
				case "fragment":
					this.hero.fragments++;
					this.hero.game.screenInfo.fragment++;
					this.hero.game.collisionEngine.removeBody( this.hero.char.objectInCollision, "fragment");
					break;
				case "enemy_bullet":
					this.hero.game.collisionEngine.removeBody( this.hero.char.objectInCollision, "enemy_projectil");
					this.hero.stateMachine.changeState(new heroDamagedState(this.hero));
					break;
				case "enemies":
					console.log("kqjrgsnrmgqjnerùp voja")
					break;
			}

			this.hero.game.context.scene.remove(this.hero.char.objectInCollision.object);

			this.hero.char.collision = false;
			this.hero.char.objectInCollision = null;
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
}

export class heroDamagedState extends State {
	constructor(hero){
		super()
		this.hero = hero;
		this.time = 2000;
		this.interval = 200;
		this.flashed = false;
	}

	enter(){
		this.intervalTime = this.hero.time;
		this.endTime = this.hero.time + this.time;

		this.hero.lifes--;
		this.hero.game.screenInfo.hero_lifes--;

		this.flash();
	}
	update(){

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
			this.hero.movementStateMachine.changeState(new heroStillState(this.hero))
    };

    this.hero.tilePos = value !== undefined ? value.arrayPos : this.hero.tilePos ;



		if(this.hero.char.collision){
			switch( this.hero.char.objectInCollision.name ){
				case "fragment":
					this.hero.fragments++;
					this.hero.game.screenInfo.fragment++;
					this.hero.game.collisionEngine.removeBody( this.hero.char.objectInCollision, "fragment");
					break;
			}
			this.hero.game.context.scene.remove(this.hero.char.objectInCollision.object);
			this.hero.char.collision = false;
			this.hero.char.objectInCollision = null;
		}

	}

	exit(){
		this.hero.char.body.head.mesh.material.opacity = 1;
	}

	flash(){



		if(this.flashed) {
			this.hero.char.body.head.mesh.material.color.setHex(0xffffff)
		}	else{
			this.hero.char.body.head.mesh.material.color.setHex(0x0a2444);
		}

		this.flashed = !this.flashed;

		if( this.hero.time < this.endTime ) setTimeout(this.flash.bind(this), 120);
		else {
			this.hero.char.body.head.mesh.material.color.setHex(0x0a2444);
			this.hero.stateMachine.changeState(new heroBasicState(this.hero));
		}
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
		if( this.hero.char.object.position.z < 12 ) {
			this.hero.stateMachine.changeState(new heroDamagedState(this.hero));
			this.hero.movementStateMachine.changeState(new heroStandState(this.hero));
		}

	}

	exit(){ }
}
