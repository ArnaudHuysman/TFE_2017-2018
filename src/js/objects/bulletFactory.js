import {Mouse, GameObjects} from '../Game/utils'


export class Bullet {
  constructor(width,height,depth,color){

    this.geom = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({color, flatShading: true});

    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.collision = false;
    this.mvt = {
      x :0,
      z :0
    };
  }

  update(scene){
    this.mesh.position.x += this.mvt.x*5;
    this.mesh.position.y += this.mvt.y*5;

    if (this.collision) {

      scene.remove(this.mesh);

      let index = GameObjects.collidableMesh.indexOf(this);
      if (index >= 0)
      {
        GameObjects.collidableMesh.splice(index,1);
      }

    }
  }

}

export default class BulletFactory {
  constructor(game){
    this.bullets = [];
    this.currentGame = game;
  }
  create(scene){

    console.log(this.currentGame.hero.char.mesh.position);
    console.log(Mouse.projectPos);

    var diffX = Mouse.projectPos.x -  this.currentGame.hero.char.mesh.position.x;
    var diffY = Mouse.projectPos.y - this.currentGame.hero.char.mesh.position.y;
    var theta = Math.atan2(diffY, diffX);
    var bullet = new Bullet(3,3,3,0xffffff);


    bullet.mvt.x = Math.cos(theta)*1.5;
    bullet.mvt.y = Math.sin(theta)*1.5;

    var decalX = Math.cos(theta)*5;
    var decalY = Math.sin(theta)*5;

    bullet.mesh.position.z = 12;
    switch(this.currentGame.hero.gunShooting){
      case "right":
        bullet.mesh.position.x = this.currentGame.hero.char.mesh.position.x + decalY;
        bullet.mesh.position.y = this.currentGame.hero.char.mesh.position.y - decalX;
        this.currentGame.hero.gunShooting = "left";
        break;
      case "left":
        bullet.mesh.position.x = this.currentGame.hero.char.mesh.position.x - decalY;
        bullet.mesh.position.y = this.currentGame.hero.char.mesh.position.y + decalX;
        this.currentGame.hero.gunShooting = "right";
        break;
    }

    this.currentGame.threeContainer.add(bullet.mesh);
    GameObjects.collidableMesh.push(bullet);
    this.bullets.push(bullet);
  }

  update(scene){
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update(scene);
    }

  }

}
