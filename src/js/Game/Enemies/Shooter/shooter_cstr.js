
class ShootingEnemy extends Enemy {
  constructor(width, height, depth, color, name){
    super(width, height, depth, color, name);
  }

  animation(){
    TweenMax.to(this.object.position, 0.5,
    {
        z:22,
        ease: Power3.easeOut,
        repeat: -1,
        yoyo:true,
    });
    TweenMax.from(this.object.scale, 0.5,
    {
        z: 1,
        y: 3.2,
        x: 3.2,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.to(this.object.rotation, 0.5,
    {
        x: 0.1,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

  }

  update(){


    var diffX = Heroes.standart.char.mesh.position.x - this.object.position.x;
    var diffY = Heroes.standart.char.mesh.position.y - this.object.position.y;


    if(Math.abs(diffY) < 100 && Math.abs(diffX) < 100) {
      this.mvt = false;
    } else {
      this.mvt = true;
    }

    var theta = Math.atan2(diffY, diffX);

    super.update();
    if(this.mvt) this.move(theta);
  }
  move(theta){

    var mvtX = Math.cos(theta);
    var mvtY = Math.sin(theta);

    this.object.position.x += mvtX*0.5;
    this.object.position.y += mvtY*0.5;

    /*if( Math.ceil(Player.targetPos.x/10) == Math.ceil(this.object.position.x/10)
    && Math.ceil(Player.targetPos.y/10) == Math.ceil(this.object.position.y/10))
    {
      this.mvt = false;
    } else {
      this.mvt = true;
    }*/


  }
}
