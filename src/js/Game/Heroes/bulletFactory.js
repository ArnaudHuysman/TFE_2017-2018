import {Mouse, GameObjects} from '../Utils/utils'


export class Bullet {
  constructor(width,height,depth,color){

    this.geom = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({color, flatShading: true});

    this.object = new THREE.Mesh(this.geom, this.mat);

    this.collision = false;
    this.mvt = {
      x :0,
      z :0
    };
  }

  update(game,scene){
    this.object.position.x += this.mvt.x*5;
    this.object.position.y += this.mvt.y*5;

    if (this.collision) {
      scene.remove(this.object);
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
    var bullet = new Bullet(3,3,3,0x000000);


    bullet.mvt.x = Math.cos(theta)*1.5;
    bullet.mvt.y = Math.sin(theta)*1.5;

    var decalX = Math.cos(theta)*5;
    var decalY = Math.sin(theta)*5;

    bullet.object.position.z = 12;
    switch(this.game.hero.gunShooting){
      case "right":
        bullet.object.position.x = this.game.hero.char.object.position.x + decalY;
        bullet.object.position.y = this.game.hero.char.object.position.y - decalX;
        this.game.hero.gunShooting = "left";
        break;
      case "left":
        bullet.object.position.x = this.game.hero.char.object.position.x - decalY;
        bullet.object.position.y = this.game.hero.char.object.position.y + decalX;
        this.game.hero.gunShooting = "right";
        break;
    }

    scene.add(bullet.object);
    this.game.collisionEngine.addBody(bullet, "hero_projectil");
    this.bullets.push(bullet);
  }

  update(scene){
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update(this.game,scene);
    }

  }

}
