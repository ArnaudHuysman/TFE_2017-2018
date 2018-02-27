class Bullet {
  constructor(width,height,depth,color){

    this.geom = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({color, flatShading: true});

    this.mesh = new THREE.Mesh(this.geom, this.mat);


    this.mvt = {
      x :0,
      z :0
    } ;


  }

  update(){
    this.mesh.position.x += this.mvt.x*5;
    this.mesh.position.y += this.mvt.y*5;

  }

}

class BulletFactory {
  constructor(){
    this.bullets = [];
  }
  create(){

    var bullet = new Bullet(2,2,2,0xffffff);
    bullet.mesh.position.z = 12;
    bullet.mesh.position.x = char.mesh.position.x;
    bullet.mesh.position.y = char.mesh.position.y;
    var diffX = rightClick.x - bullet.mesh.position.x;
    var diffY = rightClick.y - bullet.mesh.position.y;

    var theta = Math.atan2(diffY, diffX);

    bullet.mvt.x = Math.cos(theta);
    
    bullet.mvt.y = Math.sin(theta);


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
