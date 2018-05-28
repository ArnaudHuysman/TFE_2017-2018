import Enemy from '../enemy_cstr';
import {getPath, getCubePosition} from '../../Utils/path_functions';
import BulletFactory from './bullet_factory'


export default class ShooterEnemy extends Enemy {
  constructor(width, height, depth, color, outColor, name, game){
    super(width, height, depth, color, outColor, name, game);

    this.bulletFactory = new BulletFactory(game, this.body.object);

    this.fireRate = 1000;
    this.interval = 0;

  }

  animation(){
    TweenMax.to(this.body.object.position, 0.5,
    {
        z:22,
        ease: Power3.easeOut,
        repeat: -1,
        yoyo:true,
    });
    TweenMax.from(this.body.object.scale, 0.5,
    {
        z: 1,
        y: 3.2,
        x: 3.2,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.to(this.body.object.rotation, 0.5,
    {
        x: 0.1,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

  }

  update(time,scene){

    const {hero, map} = this.currentGame;

    super.update();

    this.path = getPath(map, this.tilePos, hero.tilePos );

    this.targetPosition =  this.path[5] ? getCubePosition(map, this.path[1]) : this.body.object.position;

    let diffX = this.targetPosition.x - this.body.object.position.x;
    let diffY = this.targetPosition.y - this.body.object.position.y;


    // if(Math.abs(diffY) < 100 && Math.abs(diffX) < 100) {
    //   this.mvt = false;
    // } else {
    //   this.mvt = true;
    // }

    let theta = Math.atan2(diffY, diffX);


    this.shoot(time,scene);

    this.bulletFactory.update(scene);

    if(this.mvt) this.move(theta);
  }
  move(theta){

    var mvtX = Math.cos(theta);
    var mvtY = Math.sin(theta);

    this.body.object.position.x += mvtX*0.5;
    this.body.object.position.y += mvtY*0.5;

    /*if( Math.ceil(Player.targetPos.x/10) == Math.ceil(this.object.position.x/10)
    && Math.ceil(Player.targetPos.y/10) == Math.ceil(this.object.position.y/10))
    {
      this.mvt = false;
    } else {
      this.mvt = true;
    }*/


  }

  shoot(time,scene){
    if( this.interval < time){
      this.bulletFactory.create(scene);
      this.interval = time+this.fireRate;
    }
  }
}
