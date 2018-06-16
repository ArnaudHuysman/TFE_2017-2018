import {Module} from '../Module'

export default class MenuModule extends Module {
  constructor(game, text){
    super()
    this.game = game;
    this.display = document.querySelector('.module_template').content.querySelector('.state_module').cloneNode(true);
    this.display.firstElementChild.innerText = text;
  }

  enter(callback){
    this.callback  = callback;
    this.display.style.right = "-100vw";
    this.display.style.left = "100vw";

    TweenMax.to(this.display.style, 2, {
      left : "-100vw",
      right : "100vw",
      ease: SlowMo.ease.config(0.3,0.7, false),
      onComplete : this.callback.bind(this, this.display)
    })
  }

}
