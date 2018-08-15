import {State} from '../../Utils/state_machine';
import {BigWalkAnimation, BigPopAnimation} from './big_animations'


import gsap from 'gsap';
var TweenMax = gsap.TweenMax;

export class bigSpawnState extends State{
	constructor(enemi){
    super()
    this.enemi = enemi;
	}

	enter(){

		let self = this;

		TweenMax.to(this.enemi.body.object.position, 0.8,
															{
																	delay: 1,
																	z:12,
																	ease: Power4.easeOut,
																	onComplete: function(){
																		self.enemi.stateMachine.changeState(new bigWalkState(self.enemi));
																	}
															})

  };

	exit(){

	};
}

export class bigWalkState extends State {
	constructor(enemi){
    super()
    this.enemi = enemi;

		let self = this;
		// this.interval = window.setInterval(function () {
		// 	self.enemi.game.app.audioRessource.play("mvt-big", false, 1, 1);
		// }, 1200);

	}

	enter(){

    this.enemi.animationSystem.changeAnimation(new BigWalkAnimation(this.enemi.body.object, this.enemi.game.app));

  };

	reload(){
		let self = this;
		this.enemi.animationSystem.currentAnimation.interval = window.setInterval(function () {
			self.enemi.game.app.audioRessource.play("mvt-big", false, 1, 1);
		}, 1200);
	}

	exit(){
		//window.clearInterval(this.interval);
	};

	update(tp){

    let diffX = this.enemi.targetPosition.x - this.enemi.body.object.position.x;
    let diffY = this.enemi.targetPosition.y - this.enemi.body.object.position.y;

    let theta = Math.atan2(diffY, diffX);

    var mvtX = Math.cos(theta);
    var mvtY = Math.sin(theta);

    this.enemi.body.object.position.x += mvtX*this.enemi.speed;
    this.enemi.body.object.position.y += mvtY*this.enemi.speed;

		if( this.enemi.popInterval < tp){
      this.enemi.popInterval = tp+this.enemi.popDelay;
			this.enemi.stateMachine.changeState(new bigPopState(this.enemi));
    }

  };
}

export class bigPopState extends State {
	constructor(enemi){
    super()
    this.enemi = enemi;
	}

	enter(){

    this.enemi.animationSystem.changeAnimation(new BigPopAnimation(this.enemi.body.object,this.enemi, this.changeState.bind(this)));
  };

	changeState(){

		for (var i = 0; i <= 360; i+=120 ) {

			let pos = {x: 0,y: 0,z: 0};

			pos.x = this.enemi.body.object.position.x + Math.cos(i)*25;
			pos.y = this.enemi.body.object.position.y + Math.sin(i)*25;
			pos.z = 10;

			this.enemi.game.enemyFactory.addEntity(this.enemi.game.wavesSystem.currentWave.enemies[0],this.enemi.game, pos, this.enemi.tilePos);

		}

		this.enemi.stateMachine.changeState(new bigWalkState(this.enemi));

	}

	exit(){

	};

	update(){
  };
}
