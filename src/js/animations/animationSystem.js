export class AnimationSystem {
	constructor(initAnimation){

		this.currentAnimation = initAnimation;
		this.currentAnimation.in();

	}

	changeAnimation(newAnimation){
		this.currentAnimation.out();

		this.currentAnimation = newAnimation;

		this.currentAnimation.in();
	}
}

export class Animation {
	constructor(object){
		this.object  = object;
		this.tweens = [];
	}

	in(){
	}

	out(){
		this.tweens.forEach((tween) => tween.kill());
		this.tweens = [];
	}
}
