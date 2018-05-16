import Enemy from '../enemy_cstr';
import {getPath, getCubePosition} from '../../Maps/testPosition';


export default class ShooterEnemy extends Enemy {
  constructor(width, height, depth, color, name, game){
    super(width, height, depth, color, name, game);
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

    const {hero, map} = this.currentGame;



    super.update();
    //this.path = getPath(map.matrix, this.tilePos, hero.tilePos );
    //this.targetPosition = getCubePosition(map, this.path[0]);

    let diffX = hero.char.mesh.position.x - this.object.position.x;
    let diffY = hero.char.mesh.position.y - this.object.position.y;





    if(Math.abs(diffY) < 100 && Math.abs(diffX) < 100) {
      this.mvt = false;
    } else {
      this.mvt = true;
    }

    var theta = Math.atan2(diffY, diffX);

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
