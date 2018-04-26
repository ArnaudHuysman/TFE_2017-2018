class AnimationSystem {
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

class Animation {
	constructor(object){
		this.object  = object;
	}

	in(){
	}

	mainAction(){
	}

	out(){
	}
}
