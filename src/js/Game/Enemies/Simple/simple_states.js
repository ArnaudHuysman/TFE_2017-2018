import {State} from '../../Utils/state_machine';
import {SimpleWalkAnimation, SimpleDeathAnimation} from './simple_animations'
import {Drill_Cstr} from '../../Maps/Map/drill_cstr';

import gsap from 'gsap';
var TweenMax = gsap.TweenMax;

export class simpleSpawnState extends State{
	constructor(enemi){
    super()
    this.enemi = enemi;
	}

	enter(){

		let self = this;

		TweenMax.to(this.enemi.body.object.position, 0.8,
															{
																	delay :1,
																	z:12,
																	ease: Power4.easeOut,
																	onComplete: function(){
																		self.enemi.stateMachine.changeState(new simpleWalkState(self.enemi));
																	}
															})

  };

	exit(){

	};
}


export class simpleWalkState extends State {
	constructor(enemi){
    super()
    this.enemi = enemi;

		let self = this;
		// this.interval = window.setInterval(function () {
		// 	self.enemi.game.app.audioRessource.play("mvt-small", false, 1, 1);
		// }, 800);

	}

	enter(){
    this.enemi.animationSystem.changeAnimation(new SimpleWalkAnimation(this.enemi.body.object, this.enemi.game.app));
  };

	reload(){
		let self = this;
		this.enemi.animationSystem.currentAnimation.interval = window.setInterval(function () {
			self.enemi.game.app.audioRessource.play("mvt-small", false, 1, 1);
		}, 800);
	}

	exit(){
		// window.clearInterval(this.interval);
	};

	update(){

    let diffX = this.enemi.targetPosition.x - this.enemi.body.object.position.x;
    let diffY = this.enemi.targetPosition.y - this.enemi.body.object.position.y;

    let theta = Math.atan2(diffY, diffX);

    var mvtX = Math.cos(theta);
    var mvtY = Math.sin(theta);

    this.enemi.body.object.position.x += mvtX*this.enemi.speed;
    this.enemi.body.object.position.y += mvtY*this.enemi.speed;


    if(this.enemi.body.collision && this.enemi.body.objectInCollision instanceof Drill_Cstr) {
      this.enemi.stateMachine.changeState(new simpleDeadState(this.enemi));
    }
  };
}

export class simpleDeadState extends State {
	constructor(enemi){
    super()
    this.enemi = enemi;
	}

	enter(){

    this.enemi.game.collisionEngine.removeBody( this.enemi.body , "enemies");

    this.enemi.animationSystem.changeAnimation(new SimpleDeathAnimation(this.enemi.body.object,this.enemi));
  };

	exit(){};

	update(){
  };
}
