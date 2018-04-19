class AnimationSystem {
	constructor(){
		super()

		this.currentAnimation = null;
	}


}

class Animation {
	constructor(){
		super();

		this.enterAction = null;
		this.mainAction = null;
		this.exitAction = null;
	}
}