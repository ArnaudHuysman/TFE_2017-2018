import Enemy from '../enemy_cstr';
import {getPath, getCubePosition} from '../../Utils/path_functions';
import BulletFactory from './bullet_factory'

import gsap from 'gsap';
var TweenMax = gsap.TweenMax;


export default class ShooterEnemy extends Enemy {
  constructor(width, height, depth, color, outColor, name, game, lifes, speed, factory){
    super(width, height, depth, color, outColor, name, game, lifes, speed);

    this.factory = factory;

    this.fireRate = 1000;
    this.interval = 0;

    this.matrix = game.map.matrix.map( row => row.map(x => { return x !== 0 ? 1 : 0 }));

  }

  animation(){
    TweenMax.to(this.body.object.position, 0.4,
                  {
                      z:20,
                      ease: Power2.easeOut,
                      repeat: -1,
                      yoyo:true,
                  })

    TweenMax.to(this.body.object.scale, 0.4,
                  {
                      z: 2.5,
                      y: 1.6,
                      x: 1.6,
                      ease: Power2.easeOut,
                      repeat: -1,
                      yoyo:true,
                  })

    TweenMax.fromTo(this.body.object.rotation, 0.4,
                  {
                      x: 0.1,
                      ease: Power2.easeOut,
                      repeat: -1,
                      yoyo:true,
                  },
                  {
                      x: -0.1,
                      ease: Power2.easeOut,
                      repeat: -1,
                      yoyo:true,
                  })
  }

  update(time,scene){

    const {hero, map} = this.game;

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

    this.body.object.position.x += mvtX*this.speed;
    this.body.object.position.y += mvtY*this.speed;

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
      this.game.app.audioRessource.play("tir-enemi", false, 1, 1);
      this.interval = time+this.fireRate;
    }
  }
}
