import {State} from '../../Utils/state_machine';
import {ShooterWalkAnimation, ShooterShootAnimation} from './shooter_animations'
import {Drill} from '../../Maps/Map/drill_cstr';


export class shooterWalkState extends State {
	constructor(enemi){
    super()
    this.enemi = enemi;
	}

	enter(){

    this.enemi.animationSystem.changeAnimation(new SimpleWalkAnimation(this.enemi.body.object));


  };

	exit(){};

	update(){

    let diffX = this.enemi.targetPosition.x - this.enemi.body.object.position.x;
    let diffY = this.enemi.targetPosition.y - this.enemi.body.object.position.y;

    let theta = Math.atan2(diffY, diffX);

    var mvtX = Math.cos(theta);
    var mvtY = Math.sin(theta);

    this.enemi.body.object.position.x += mvtX*0.4;
    this.enemi.body.object.position.y += mvtY*0.4;

    if(this.enemi.body.collision && this.enemi.body.objectInCollision instanceof Drill) {
      this.enemi.stateMachine.changeState(new simpleDeadState(this.enemi));
    }
  };
}

export class shooterDeadState extends State {
	constructor(enemi){
    super()
    this.enemi = enemi;
	}

	enter(){
    this.enemi.currentGame.collisionEngine.removeBody( this.enemi.body , "enemies");
    this.enemi.animationSystem.changeAnimation(new SimpleDeathAnimation(this.enemi.body.object,this.enemi));
  };

	exit(){};

	update(){
  };
}
