class BigEnemy extends Enemy {
  constructor(width, height, depth, color, name){
    super(width, height, depth, color, name);

    this.target = null;
    this.mvtInterval = 0;
    this.mvtDelay = 15000;

    this.popDelay = 5000;
    this.popInterval = mvtTime + this.popDelay;

  }

  update(tp){

    if( this.mvtInterval < tp){
      this.target = getRandomTiles();
      this.mvtInterval = tp+this.mvtDelay;
    }

    if( this.popInterval < tp){
      this.spawnSimple();
      this.popInterval = tp+this.popDelay;
    }

    var diffX = this.target.x - this.object.position.x;
    var diffY = this.target.y - this.object.position.y;

    var theta = Math.atan2(diffY, diffX);

    super.update();
    this.move(theta);
  }

  move(theta){
    var mvtX = Math.cos(theta);
    var mvtY = Math.sin(theta);

    this.object.position.x += mvtX*0.3;
    this.object.position.y += mvtY*0.3;
  }

  animation(){
    TweenMax.to(this.object.position, 0.6,
    {
        z:22,
        ease: Power3.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.fromTo(this.object.scale, 0.6,
    {
        z: 1.6,
        y: 2.1,
        x: 2.1,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    },
    {
        z: 2.1,
        y: 1.9,
        x: 1.9,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

  }
  hitAction(hitableObjects){
    if(hitableObjects instanceof Bullet ) removeSelf(this);
  }

  spawnSimple(){
    for (var i = 0; i <= 360; i+=120 ) {

      let pos = {x: 0,y: 0,z: 0};

      pos.x = this.object.position.x + Math.cos(i)*25;
      pos.y = this.object.position.y + Math.sin(i)*25;
      pos.z = 10;

      enemiesSpawn("simple", pos)
    }
  }
}

function getRandomTiles(){
  var rdm = Math.floor(Math.random() * mapTiles.length);

  var vector = new THREE.Vector3();
  vector.setFromMatrixPosition( mapTiles[rdm].matrixWorld );

  return vector;
}
