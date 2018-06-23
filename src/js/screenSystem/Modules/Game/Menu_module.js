import {Module} from '../Module'

export default class MenuModule extends Module {
  constructor(game){
    super()
    this.game = game;
    this.display = document.querySelector('.module_template').content.querySelector('.menu_module').cloneNode(true);
  }

  enter(callback){
    this.callback = callback;
    for (var i = 0; i < this.game.enemyFactory.entities.length; i++) {
      if(this.game.enemyFactory.entities[i].stateMachine.currentState.interval) {
        window.clearInterval(this.game.enemyFactory.entities[i].stateMachine.currentState.interval);
      }
    }
    this.display.addEventListener('click', this.exit.bind(this));
  }

  exit(){
    this.callback(this.display);

    for (var i = 0; i < this.game.enemyFactory.entities.length; i++) {
      if(this.game.enemyFactory.entities[i].stateMachine.currentState.reload) {
        this.game.enemyFactory.entities[i].stateMachine.currentState.reload();
      }
    }

    this.game.paused = false;
  }

  navigate(btn){
	}

}
