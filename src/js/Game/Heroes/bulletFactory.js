import {Mouse, GameObjects} from '../Utils/utils'
import Cube from '../Utils/cube_cstr';


export class Bullet {
  constructor(width,height,depth,color,outColor){

    this.name ="hero_bullet"

    this.body = new Cube(width, height, depth, color, outColor, this.name);

    this.collision = false;
    this.mvt = {
      x :0,
      z :0
    };
  }

  update(game,scene){
    this.body.object.position.x += this.mvt.x*5;
    this.body.object.position.y += this.mvt.y*5;

    if (this.collision) {
      scene.remove(this.body.object);
      game.collisionEngine.removeBody(this, "hero_projectil");
      let index = game.hero.bulletFactory.bullets.indexOf(this);

  		if (index >= 0)
  		{
  			game.hero.bulletFactory.bullets.splice(index,1);
  		}
    }
  }

}

export default class BulletFactory {
  constructor(game){
    this.bullets = [];
    this.game = game;
  }
  create(scene){

    var diffX = Mouse.projectPos.x -  this.game.hero.char.object.position.x;
    var diffY = Mouse.projectPos.y - this.game.hero.char.object.position.y;
    var theta = Math.atan2(diffY, diffX);
    var bullet = new Bullet(5,5,5,0x119DA4,0x3A015C);


    bullet.mvt.x = Math.cos(theta)*1.5;
    bullet.mvt.y = Math.sin(theta)*1.5;

    var decalX = Math.cos(theta)*5;
    var decalY = Math.sin(theta)*5;

    bullet.body.object.position.z = 12;
    switch(this.game.hero.gunShooting){
      case "right":
        bullet.body.object.position.x = this.game.hero.char.object.position.x + decalY;
        bullet.body.object.position.y = this.game.hero.char.object.position.y - decalX;
        this.game.hero.gunShooting = "left";
        break;
      case "left":
        bullet.body.object.position.x = this.game.hero.char.object.position.x - decalY;
        bullet.body.object.position.y = this.game.hero.char.object.position.y + decalX;
        this.game.hero.gunShooting = "right";
        break;
    }

    scene.add(bullet.body.object);
    this.game.collisionEngine.addBody(bullet.body, "hero_projectil");
    this.bullets.push(bullet);
  }

  update(scene){
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update(this.game,scene);
    }

  }

}
