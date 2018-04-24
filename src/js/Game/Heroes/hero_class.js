class Hero {
  constructor() {

    this.char = new Char();
    this.char.mesh.position.z = 11;
    this.char.mesh.scale.set(2.5,2.5,2.5);
    scene.add(this.char.mesh);

    this.action  = "stand";
  }

  model(){

  }

  update(){

  }

  animation(){


  }

  movement(){

  }

  shoot(){

  }
}

class StandartHero extends Hero {
  constructor(){
    super()
  }

}

const Heroes = {
  standart : new StandartHero(),
}
