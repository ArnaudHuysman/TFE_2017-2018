class Bullet {
  constructor(width,height,depth,color){

    this.geom = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({color, shading:THREE.FlatShading});

    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.mvt = {
      x :0,
      z :0
    } ;


  }

  update(){
    this.mesh.position.x += this.mvt.x*5;
    this.mesh.position.z += this.mvt.z*5;

  }

}

class BulletFactory {
  constructor(){
    this.bullets = [];
  }
  create(){

    var bullet = new Bullet(2,2,2,0xffffff);
    bullet.mesh.position.y = 14;
    bullet.mesh.position.x = char.mesh.position.x;
    bullet.mesh.position.z = char.mesh.position.z;
    var diffX = rightClick.x - bullet.mesh.position.x;
    var diffZ = rightClick.z - bullet.mesh.position.z;

    var theta = Math.atan2(diffZ, diffX);

    bullet.mvt.x = Math.cos(theta);
    bullet.mvt.z = Math.sin(theta);

    scene.add(bullet.mesh);
    this.bullets.push(bullet);
  }

  update(){
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();
    }

  }

}
