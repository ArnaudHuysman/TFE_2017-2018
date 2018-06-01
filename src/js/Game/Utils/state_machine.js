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

}

export class State {
	constructor(){
	}

	enter(){};

	exit(){};

	update(){};
}
