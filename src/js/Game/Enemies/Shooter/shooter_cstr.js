import Enemy from '../enemy_cstr';
import {getPath, getCubePosition} from '../../Utils/path_functions';
import BulletFactory from './bullet_factory'


export default class ShooterEnemy extends Enemy {
  constructor(width, height, depth, color, outColor, name, game, factory){
    super(width, height, depth, color, outColor, name, game);

    this.factory = factory;

    this.fireRate = 1000;
    this.interval = 0;

    this.matrix = game.map.matrix.map( row => row.map(x => { return x !== 0 ? 1 : 0 }));

    this.lifes = 2;

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

    this.path = getPath(this.matrix, true, this.tilePos, hero.tilePos, map );

    if( this.path.length > 0 ) this.targetPosition =  this.path[5] ? getCubePosition(map, this.path[1]) : getCubePosition(map, this.path[0]);


    let diffX = this.targetPosition.x - this.body.object.position.x;
    let diffY = this.targetPosition.y - this.body.object.position.y;


    // if(Math.abs(diffY) < 100 && Math.abs(diffX) < 100) {
    //   this.mvt = false;
    // } else {
    //   this.mvt = true;
    // }

    let theta = Math.atan2(diffY, diffX);


    this.shoot(time,scene);

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
      this.factory.bulletFactory.create(scene, this.body.object);
      this.interval = time+this.fireRate;
    }
  }
}
