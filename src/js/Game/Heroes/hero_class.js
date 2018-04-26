class Hero {
  constructor() {

    this.char = new Char();
    this.char.mesh.position.z = 11;
    this.char.mesh.scale.set(2.5,2.5,2.5);
    scene.add(this.char.mesh);

    this.animationSystem = new AnimationSystem(new StandAnimation(this.char.body));
  }

  model(){

  }

  update(){

  }

  animation(){


  }

  movement(){
    if(Player.isLeftClick && !this.char.body.mvt){

      this.animationSystem.changeAnimation(new WalkAnimation(this.char.body));

    }

    if( Player.isLeftClick || this.char.body.mvt )
    {
      var diffX = Player.targetPos.x - this.char.mesh.position.x;
      var diffY = Player.targetPos.y - this.char.mesh.position.y;

      var theta = Math.atan2(diffY, diffX);

      var mvtX = Math.cos(theta);
      var mvtY = Math.sin(theta);

      this.char.mesh.position.x += mvtX*2;
      this.char.mesh.position.y += mvtY*2;

      if( Math.ceil(Player.targetPos.x/10) == Math.ceil(this.char.mesh.position.x/10)
      && Math.ceil(Player.targetPos.y/10) == Math.ceil(this.char.mesh.position.y/10))
      {
        this.animationSystem.changeAnimation(new StandAnimation(this.char.body))
        this.char.body.mvt = false;
      } else {
        this.char.body.mvt = true;
      }
    }

    var lookAtPoint = new THREE.Vector3(mouseProjectPos.x,mouseProjectPos.y,12);

    this.char.mesh.up = new THREE.Vector3(0,0,1);
    this.char.mesh.lookAt(lookAtPoint);
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
