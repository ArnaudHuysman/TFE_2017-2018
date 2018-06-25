export default class StateMachine {

	constructor(initState){
		this.currentState = initState;
		this.currentState.enter();
	}

  changeState(newState)
  {
    this.currentState.exit();

    this.currentState = newState ;

    this.currentState.enter();
  }

	out(){
		this.currentState.exit();
	}

}

export class State {
	constructor(){
	}

	enter(){};

	exit(){};

	update(){};
}
