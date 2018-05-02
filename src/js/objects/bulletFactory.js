class Bullet {
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

  update(){
    this.mesh.position.x += this.mvt.x*5;
    this.mesh.position.y += this.mvt.y*5;

    if (this.collision) {

      scene.remove(this.mesh);

      let index = Game.collidableMesh.indexOf(this);
      if (index >= 0)
      {
        Game.collidableMesh.splice(index,1);
      }

    }
  }

}

class BulletFactory {
  constructor(){
    this.bullets = [];
  }
  create(){


    var diffX = mouseProjectPos.x -  Heroes.standart.char.mesh.position.x;;
    var diffY = mouseProjectPos.y - Heroes.standart.char.mesh.position.y;
    var theta = Math.atan2(diffY, diffX);
    console.log(theta);
    var bullet = new Bullet(2,2,2,0xffffff);


    bullet.mvt.x = Math.cos(theta)*1.5;
    bullet.mvt.y = Math.sin(theta)*1.5;

    var decalX = Math.cos(theta)*5;
    var decalY = Math.sin(theta)*5;

    bullet.mesh.position.z = 12;
    switch(Heroes.standart.gunShooting){
      case "right":
        bullet.mesh.position.x = Heroes.standart.char.mesh.position.x + decalY;
        bullet.mesh.position.y = Heroes.standart.char.mesh.position.y - decalX;
        Heroes.standart.gunShooting = "left";
        break;
      case "left":
        bullet.mesh.position.x = Heroes.standart.char.mesh.position.x - decalY;
        bullet.mesh.position.y = Heroes.standart.char.mesh.position.y + decalX;
        Heroes.standart.gunShooting = "right";
        break;
    }

    scene.add(bullet.mesh);
    Game.collidableMesh.push(bullet);
    this.bullets.push(bullet);
  }

  update(){
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();
    }

  }

}
