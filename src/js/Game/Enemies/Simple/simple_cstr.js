import Enemy from '../enemy_cstr';
import {Drill} from '../../Maps/drill'


export default class SimpleEnemy extends Enemy {
  constructor(width, height, depth, color, name, game){
    super(width, height, depth, color, name, game)
  }

  update(){
    var diffX = this.target.object.position.x - this.object.position.x;
    var diffY = this.target.object.position.y - this.object.position.y;

    var theta = Math.atan2(diffY, diffX);

    super.update();
    this.move(theta);
  }

  move(theta){
    var mvtX = Math.cos(theta);
    var mvtY = Math.sin(theta);

    this.object.position.x += mvtX*0.2;
    this.object.position.y += mvtY*0.2;
  }

  animation(){
    TweenMax.to(this.object.position, 0.4,
    {
        z:16,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.to(this.object.scale, 0.4,
    {
        z: 2.1,
        y: 1.9,
        x: 1.9,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.fromTo(this.object.rotation, 0.4,
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
