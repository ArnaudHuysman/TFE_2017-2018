export class AnimationSystem {
	constructor(){

		this.currentAnimation = null;


	}

	changeAnimation(newAnimation){
		if(this.currentAnimation) this.currentAnimation.out();

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
