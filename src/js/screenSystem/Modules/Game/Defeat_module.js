import {Module} from '../Module'

import gsap from 'gsap';
var TweenMax = gsap.TweenMax;

export default class DefeatModule extends Module {
  constructor(game){
    super()
    this.game = game;
    this.display = document.querySelector('.module_template').content.querySelector('.defeat').cloneNode(true);
    this.buttons = this.display.querySelectorAll('.button');
  }

  enter(callback){
    this.callback  = callback;
    this.display.style.transform = "scale(0.1)";

    for (var button of this.buttons) {
      button.addEventListener('click', this.navigate.bind(this, button));
    }

    TweenMax.to(this.display.style, 0.8, {
      transform : "scale(1)",
      ease: Elastic.easeOut.config(1, 0.5),
      // onComplete : this.callback.bind(this, this.display)
    })
  }

  navigate(btn){
    let name = btn.className.replace("end_module--btn button ", "");

    switch (name) {
      case "return":
        this.callback(this.display);
        break;
      case "replay":
        this.callback(this.display);
        break;
      default:

    }
  }
}
