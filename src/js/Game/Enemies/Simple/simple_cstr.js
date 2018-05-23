import Enemy from '../enemy_cstr';
import {Drill} from '../../Maps/Map/drill_cstr'
import {getPath, getCubePosition} from '../../Utils/path_functions';



export default class SimpleEnemy extends Enemy {
  constructor(width, height, depth, color, outcolor, name, game){
    super(width, height, depth, color, outcolor, name, game)
  }

  update(){
    const {hero, map} = this.currentGame;

    super.update();

    this.path = getPath(map, this.tilePos, hero.tilePos );

    this.targetPosition =  this.path[3] ? getCubePosition(map, this.path[1]) : this.body.object.position;

    let diffX = this.targetPosition.x - this.body.object.position.x;
    let diffY = this.targetPosition.y - this.body.object.position.y;

    let theta = Math.atan2(diffY, diffX);


    if(this.mvt) this.move(theta);
  }

  move(theta){
    var mvtX = Math.cos(theta);
    var mvtY = Math.sin(theta);

    this.body.object.position.x += mvtX*0.2;
    this.body.object.position.y += mvtY*0.2;
  }

  animation(){
    TweenMax.to(this.body.object.position, 0.4,
    {
        z:16,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.to(this.body.object.scale, 0.4,
    {
        z: 2.1,
        y: 1.9,
        x: 1.9,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

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
    });
  }

  hitAction(hitableObjects){
    if(hitableObjects instanceof Drill ) drill.life -= 10;
    this.currentGame.enemyFactory.removeSelf(this);
  }
}
