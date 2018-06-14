export default class ModuleSystem {
  constructor(container){
		this.container = container;

		this.module = null;
	}

  setModule(module){
    this.module = module;
    this.container.appendChild(this.module.display);

    this.module.enter(this.removeModule.bind(this));
  }

  removeModule(display){
    this.container.removeChild(display);
    this.module = null;
  }

}

export class Module {
  constructor(){
    this.display = null;
  }

  enter(){
  };

  navigate(){
  };

}
