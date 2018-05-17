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

    this.path = getPath(map.matrix, this.tilePos, hero.tilePos );

    console.log(this.path, this.tilePos);

    this.targetPosition =  this.path[3] ? getCubePosition(map, this.path[1]) : {x:0, y:0, z:0};




    let diffX = this.targetPosition.x - this.object.position.x;
    let diffY = this.targetPosition.y - this.object.position.y;


    // if(Math.abs(diffY) < 100 && Math.abs(diffX) < 100) {
    //   this.mvt = false;
    // } else {
    //   this.mvt = true;
    // }

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
