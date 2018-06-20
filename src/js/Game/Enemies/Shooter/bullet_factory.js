import Cube from '../../Utils/cube_cstr';

export class Bullet {
  constructor(width,height,depth,color,outColor, callback){

    this.name = "enemy_bullet";
    this.callback = callback;
    this.body = new Cube(width, height, depth, color, outColor, this.name);

    this.collision = false;
    this.mvt = {
      x :0,
      z :0
    };

    setTimeout(this.callback.bind(this,this), 3000);
  }

  update(game,scene,factory){
    this.body.object.position.x += this.mvt.x*2;
    this.body.object.position.y += this.mvt.y*2;

    if (this.body.collision) {
      scene.remove(this.body.object);
      let index = game.hero.bulletFactory.bullets.indexOf(this);

  		if (index >= 0)
  		{
  			factory.bullets.splice(index,1);
  		}
    }
  }

}

export default class BulletFactory {
  constructor(game){
    this.bullets = [];
    this.game = game;
    this.target = this.game.hero.char.object;
  }
  create(scene, source){

    var diffX = this.target.position.x - source.position.x;
    var diffY = this.target.position.y - source.position.y;
    var theta = Math.atan2(diffY, diffX);
    var bullet = new Bullet(5,5,5,0x9216FF, 0x1E0633, this.removeSelf.bind(this));


    bullet.mvt.x = Math.cos(theta)*1.5;
    bullet.mvt.y = Math.sin(theta)*1.5;

    var decalX = Math.cos(theta)*5;
    var decalY = Math.sin(theta)*5;

    bullet.body.object.position.z = 12;

    bullet.body.object.position.x = source.position.x;
    bullet.body.object.position.y = source.position.y;

    scene.add(bullet.body.object);
    this.game.collisionEngine.addBody(bullet.body, "enemy_projectil");
    this.bullets.push(bullet);
  }

  update(scene){
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update(this.game,scene,this);
    }
  }

  removeSelf(obj){

    this.game.context.scene.remove(obj.body.object);
    this.game.collisionEngine.removeBody(obj.body, "enemy_projectil");
    let index = this.bullets.indexOf(obj);
		if (index >= 0)
		{
			this.bullets.splice(index,1);
		}

  };



}
