import {State} from '../../Utils/state_machine';
import {ShooterWalkAnimation, ShooterShootAnimation} from './shooter_animations'
import {Drill} from '../../Maps/Map/drill_cstr';


export class shooterWalkState extends State {
	constructor(enemi){
    super()
    this.enemi = enemi;
	}

	enter(){

    this.enemi.animationSystem.changeAnimation(new ShooterWalkAnimation(this.enemi.body.object));

  };

	exit(){};

	update(){
    let diffX = this.enemi.targetPosition.x - this.enemi.body.object.position.x;
    let diffY = this.enemi.targetPosition.y - this.enemi.body.object.position.y;

    let theta = Math.atan2(diffY, diffX);

    var mvtX = Math.cos(theta);
    var mvtY = Math.sin(theta);

    this.enemi.body.object.position.x += mvtX*this.enemi.speed;
    this.enemi.body.object.position.y += mvtY*this.enemi.speed;

		if(this.enemi.canShoot) {
			this.enemi.stateMachine.changeState(new shooterShootState(this.enemi));
		}
  };
}

export class shooterShootState extends State {
	constructor(enemi){
    super()
    this.enemi = enemi;
	}

	enter(){
    this.enemi.animationSystem.changeAnimation(new ShooterShootAnimation(this.enemi.body.object,this.enemi, this.shoot.bind(this)));
  };

	shoot(){
		this.enemi.factory.bulletFactory.create(this.enemi.game.context.scene, this.enemi.body.object);
		this.enemi.game.app.audioRessource.play("tir-enemi", false, 1, 1);
	}

	exit(){};

	update(){
		if(!this.enemi.canShoot || this.enemi.lifes <= 0 ){
			this.enemi.stateMachine.changeState(new shooterWalkState(this.enemi));
		}
  };
}
