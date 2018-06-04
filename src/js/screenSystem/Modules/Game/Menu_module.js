import {Module} from '../Module'

export default class MenuModule extends Module {
  constructor(){
    super()
    this.display = document.querySelector('.module_template').content.querySelector('.menu_module').cloneNode(true);
    this.buttons = this.display.querySelectorAll('.button');
  }

  enter(callback){
    this.callback = callback;
    for (var button of this.buttons) {
			button.addEventListener('click', this.navigate.bind(this, button));
		}
  }

  navigate(btn){
		let name = btn.className.replace(" button", "");

    switch (name) {
      case "exit":
        this.callback(this.display);
        break;

    }
	}

}
